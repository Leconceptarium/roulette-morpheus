const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const db = require('../database/db');

// Initialiser le client Twilio
let twilioClient = null;

if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

/**
 * Envoie une demande d'avis par SMS
 * POST /api/send-review-request
 * Body: { phone: "+33612345678", customerName: "Jean" }
 */
router.post('/send-review-request', async (req, res) => {
  try {
    // Vérifier que Twilio est configuré
    if (!twilioClient) {
      return res.status(503).json({
        success: false,
        error: 'Le service SMS n\'est pas configuré. Veuillez configurer Twilio dans le fichier .env'
      });
    }

    const { phone, customerName } = req.body;

    // Validation
    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Le numéro de téléphone est requis'
      });
    }

    // Formater le numéro de téléphone
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith('+')) {
      // Ajouter le préfixe français par défaut
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '+33' + formattedPhone.substring(1);
      } else {
        formattedPhone = '+33' + formattedPhone;
      }
    }

    // Créer un ID unique pour tracker le clic
    const timestamp = Date.now();
    const requestId = `${timestamp}`;

    // Construire le lien personnalisé
    const reviewLink = `${process.env.BASE_URL || 'http://localhost:3000'}/avis/sms/${requestId}`;

    // Personnaliser le message
    const customerGreeting = customerName ? `Bonjour ${customerName}, ` : 'Bonjour, ';
    
    const message = `${customerGreeting}merci d'avoir visité Morpheus Experience ! 🎭✨

Nous espérons que vous avez passé un moment magique dans notre escape game.

Votre avis compte énormément pour nous ! Pourriez-vous prendre 2 minutes pour partager votre expérience sur Google ?

👉 ${reviewLink}

Merci infiniment ! 
L'équipe Morpheus 🔮`;

    // Envoyer le SMS via Twilio
    const twilioMessage = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    // Enregistrer dans la base de données
    const dbId = await db.recordSMSRequest(
      formattedPhone,
      customerName || null,
      twilioMessage.sid
    );

    console.log(`✓ SMS envoyé à ${formattedPhone} (ID: ${dbId}, SID: ${twilioMessage.sid})`);

    res.json({
      success: true,
      message: 'SMS envoyé avec succès',
      data: {
        id: dbId,
        phone: formattedPhone,
        twilioSid: twilioMessage.sid,
        reviewLink: reviewLink
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS:', error);
    
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi du SMS',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Envoie des SMS en masse
 * POST /api/send-bulk-review-requests
 * Body: { customers: [{ phone: "+33612345678", name: "Jean" }, ...] }
 */
router.post('/send-bulk-review-requests', async (req, res) => {
  try {
    if (!twilioClient) {
      return res.status(503).json({
        success: false,
        error: 'Le service SMS n\'est pas configuré'
      });
    }

    const { customers } = req.body;

    if (!Array.isArray(customers) || customers.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Le tableau de clients est requis et ne peut pas être vide'
      });
    }

    const results = {
      success: [],
      failed: []
    };

    // Envoyer les SMS avec un délai pour éviter le rate limiting
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      
      try {
        // Attendre 1 seconde entre chaque SMS
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const response = await fetch(`${process.env.BASE_URL}/api/send-review-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: customer.phone,
            customerName: customer.name
          })
        });

        const data = await response.json();

        if (data.success) {
          results.success.push({
            phone: customer.phone,
            name: customer.name
          });
        } else {
          results.failed.push({
            phone: customer.phone,
            name: customer.name,
            error: data.error
          });
        }

      } catch (error) {
        results.failed.push({
          phone: customer.phone,
          name: customer.name,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: `${results.success.length} SMS envoyés, ${results.failed.length} échecs`,
      data: results
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi en masse:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi en masse'
    });
  }
});

/**
 * Webhook pour recevoir les statuts de livraison Twilio (optionnel)
 */
router.post('/webhook/twilio-status', (req, res) => {
  const { MessageSid, MessageStatus } = req.body;
  
  console.log(`Statut Twilio - SID: ${MessageSid}, Status: ${MessageStatus}`);
  
  // Vous pouvez mettre à jour la base de données ici si besoin
  
  res.status(200).send('OK');
});

module.exports = router;
