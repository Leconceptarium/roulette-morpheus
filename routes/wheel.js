const express = require('express');
const router = express.Router();
const db = require('../database/db');

/**
 * Page de la roue de fidélité
 */
router.get('/roue', (req, res) => {
  const hasReviewed = req.query.reviewed === 'true';
  res.sendFile('wheel.html', { root: './public' });
});

/**
 * Enregistrer un prix gagné à la roue
 * POST /api/wheel-prize
 */
router.post('/wheel-prize', async (req, res) => {
  try {
    const { prize, code, timestamp } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Enregistrer dans la base de données
    await db.recordWheelPrize(prize, code, ipAddress, timestamp);

    res.json({
      success: true,
      message: 'Prix enregistré avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du prix:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'enregistrement'
    });
  }
});

/**
 * Récupérer les statistiques de la roue (admin)
 */
router.get('/wheel-stats', async (req, res) => {
  try {
    const stats = await db.getWheelStats();
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des stats roue:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    });
  }
});

/**
 * Vérifier si un code promo est valide
 * GET /api/validate-code/:code
 */
router.get('/validate-code/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const isValid = await db.validatePromoCode(code);

    res.json({
      success: true,
      valid: isValid,
      message: isValid ? 'Code valide' : 'Code invalide ou déjà utilisé'
    });

  } catch (error) {
    console.error('Erreur lors de la validation du code:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la validation'
    });
  }
});

/**
 * Marquer un code comme utilisé
 * POST /api/use-code
 */
router.post('/use-code', async (req, res) => {
  try {
    const { code } = req.body;

    await db.usePromoCode(code);

    res.json({
      success: true,
      message: 'Code marqué comme utilisé'
    });

  } catch (error) {
    console.error('Erreur lors de l\'utilisation du code:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'utilisation du code'
    });
  }
});

module.exports = router;
