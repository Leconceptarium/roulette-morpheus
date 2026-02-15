const express = require('express');
const router = express.Router();
const db = require('../database/db');

/**
 * Middleware d'authentification basique (à améliorer en production)
 */
function authenticateAdmin(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'morpheus2024';
  const providedPassword = req.query.password || req.body.password;

  if (providedPassword !== adminPassword) {
    return res.status(401).render('admin-login', {
      title: 'Connexion Admin',
      error: providedPassword ? 'Mot de passe incorrect' : null
    });
  }

  next();
}

/**
 * Page de connexion admin
 */
router.get('/login', (req, res) => {
  res.render('admin-login', {
    title: 'Connexion Admin',
    error: null
  });
});

/**
 * Tableau de bord des statistiques
 */
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const stats = await db.getStats();
    const dailyStats = await db.getDailyStats(30);
    const recentSMS = await db.getRecentSMSRequests(20);

    res.render('admin-stats', {
      title: 'Statistiques - Morpheus Experience',
      businessName: 'Morpheus Experience',
      stats: stats,
      dailyStats: dailyStats,
      recentSMS: recentSMS,
      adminPassword: req.query.password || req.body.password
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Impossible de charger les statistiques'
    });
  }
});

/**
 * Statistiques de la roue
 */
router.get('/wheel-stats', authenticateAdmin, async (req, res) => {
  try {
    const wheelStats = await db.getWheelStats();
    const recentPrizes = await db.getRecentWheelPrizes(50);

    res.render('admin-wheel-stats', {
      title: 'Statistiques Roue - Morpheus Experience',
      businessName: 'Morpheus Experience',
      wheelStats: wheelStats,
      recentPrizes: recentPrizes,
      adminPassword: req.query.password || req.body.password
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des stats roue:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Impossible de charger les statistiques de la roue'
    });
  }
});

/**
 * Interface d'envoi de SMS
 */
router.get('/send-sms', authenticateAdmin, (req, res) => {
  res.render('admin-send-sms', {
    title: 'Envoyer des SMS - Morpheus Experience',
    businessName: 'Morpheus Experience',
    adminPassword: req.query.password || req.body.password
  });
});

/**
 * API pour récupérer les stats en JSON (pour graphiques)
 */
router.get('/api/stats', authenticateAdmin, async (req, res) => {
  try {
    const stats = await db.getStats();
    const dailyStats = await db.getDailyStats(30);
    
    res.json({
      success: true,
      data: {
        global: stats,
        daily: dailyStats
      }
    });
  } catch (error) {
    console.error('Erreur API stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    });
  }
});

/**
 * API pour récupérer les SMS récents
 */
router.get('/api/sms-requests', authenticateAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const requests = await db.getRecentSMSRequests(limit);
    
    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Erreur API SMS requests:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des demandes SMS'
    });
  }
});

/**
 * Export des données en CSV
 */
router.get('/export/csv', authenticateAdmin, async (req, res) => {
  try {
    const stats = await db.getDailyStats(365);
    
    // Créer le CSV
    let csv = 'Date,Clics\n';
    stats.forEach(stat => {
      csv += `${stat.date},${stat.clicks}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=morpheus-stats.csv');
    res.send(csv);

  } catch (error) {
    console.error('Erreur export CSV:', error);
    res.status(500).send('Erreur lors de l\'export');
  }
});

module.exports = router;
