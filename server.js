require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const db = require('./database/db');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
const smsRoutes = require('./routes/sms');
const wheelRoutes = require('./routes/wheel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet({
  contentSecurityPolicy: false, // Désactivé pour permettre Google Reviews
}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes principales
app.use('/', reviewRoutes);
app.use('/admin', adminRoutes);
app.use('/api', smsRoutes);
app.use('/api', wheelRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Morpheus Experience - Système d\'Avis',
    businessName: 'Morpheus Experience'
  });
});

// Route de santé pour monitoring
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page non trouvée',
    businessName: 'Morpheus Experience'
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).render('error', {
    title: 'Erreur',
    message: process.env.NODE_ENV === 'production' 
      ? 'Une erreur est survenue' 
      : err.message
  });
});

// Initialisation de la base de données
db.initialize()
  .then(() => {
    console.log('✓ Base de données initialisée');
    
    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🎭 MORPHEUS EXPERIENCE - Système d'Avis Google     ║
║                                                       ║
║   Serveur démarré sur le port ${PORT}                    ║
║   URL: http://localhost:${PORT}                          ║
║                                                       ║
║   📱 Page d'avis: http://localhost:${PORT}/avis          ║
║   📊 Admin: http://localhost:${PORT}/admin               ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
      `);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur d\'initialisation:', err);
    process.exit(1);
  });

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu, arrêt propre du serveur...');
  db.close();
  process.exit(0);
});

module.exports = app;
