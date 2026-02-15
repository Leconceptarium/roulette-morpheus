const express = require('express');
const router = express.Router();
const db = require('../database/db');

/**
 * Page de redirection vers Google Reviews
 * Cette page affiche un message de remerciement puis redirige automatiquement
 */
router.get('/avis', async (req, res) => {
  try {
    // Enregistrer le clic dans la base de données
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent') || '';
    const referrer = req.get('referer') || '';
    
    await db.recordClick(ipAddress, userAgent, referrer);
    
    // Récupérer l'URL Google Reviews depuis les variables d'environnement
    const googleReviewUrl = process.env.GOOGLE_REVIEW_URL;
    
    if (!googleReviewUrl) {
      return res.status(500).render('error', {
        title: 'Configuration manquante',
        message: 'L\'URL Google Reviews n\'est pas configurée.'
      });
    }
    
    // Afficher la page de transition avec redirection automatique
    res.render('review-page', {
      title: 'Merci pour votre avis !',
      businessName: 'Morpheus Experience',
      googleReviewUrl: googleReviewUrl,
      redirectDelay: 3000 // 3 secondes avant redirection
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du clic:', error);
    // Rediriger quand même vers Google même en cas d'erreur
    res.redirect(process.env.GOOGLE_REVIEW_URL);
  }
});

/**
 * Route directe pour redirection immédiate (pour les QR codes par exemple)
 */
router.get('/avis/direct', async (req, res) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent') || '';
    const referrer = req.get('referer') || '';
    
    await db.recordClick(ipAddress, userAgent, referrer);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du clic:', error);
  }
  
  res.redirect(process.env.GOOGLE_REVIEW_URL);
});

/**
 * Route pour tracker les clics depuis les SMS
 */
router.get('/avis/sms/:requestId', async (req, res) => {
  try {
    const requestId = req.params.requestId;
    
    // Enregistrer le clic
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent') || '';
    
    await db.recordClick(ipAddress, userAgent, 'sms');
    
    // Mettre à jour le statut de la demande SMS
    await db.updateSMSStatus(requestId, 'clicked', true);
    
    const googleReviewUrl = process.env.GOOGLE_REVIEW_URL;
    
    res.render('review-page', {
      title: 'Merci pour votre avis !',
      businessName: 'Morpheus Experience',
      googleReviewUrl: googleReviewUrl,
      redirectDelay: 3000,
      fromSMS: true
    });
    
  } catch (error) {
    console.error('Erreur lors du traitement du clic SMS:', error);
    res.redirect(process.env.GOOGLE_REVIEW_URL);
  }
});

/**
 * API pour obtenir l'URL de redirection (utile pour les intégrations)
 */
router.get('/api/review-url', (req, res) => {
  res.json({
    url: process.env.GOOGLE_REVIEW_URL,
    shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/avis`
  });
});

module.exports = router;
