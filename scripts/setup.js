#!/usr/bin/env node

/**
 * Script de configuration automatique pour Morpheus Reviews
 * Lance ce script avec : node scripts/setup.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🎭 MORPHEUS EXPERIENCE - Configuration Automatique      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);

  console.log('Bienvenue ! Ce script va vous aider à configurer votre système d\'avis.\n');

  // Vérifier si .env existe déjà
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const overwrite = await question('⚠️  Un fichier .env existe déjà. Voulez-vous le reconfigurer ? (o/n) : ');
    if (overwrite.toLowerCase() !== 'o') {
      console.log('\nConfiguration annulée. Votre fichier .env actuel est préservé.');
      rl.close();
      return;
    }
  }

  const config = {};

  // Configuration Google Reviews
  console.log('\n📍 CONFIGURATION GOOGLE REVIEWS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  config.GOOGLE_REVIEW_URL = await question('URL de votre page Google Reviews : ');
  
  while (!config.GOOGLE_REVIEW_URL.startsWith('http')) {
    console.log('❌ L\'URL doit commencer par http:// ou https://');
    config.GOOGLE_REVIEW_URL = await question('URL de votre page Google Reviews : ');
  }

  // Configuration serveur
  console.log('\n🖥️  CONFIGURATION SERVEUR');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const port = await question('Port du serveur (défaut: 3000) : ');
  config.PORT = port || '3000';

  const baseUrl = await question(`URL de base (défaut: http://localhost:${config.PORT}) : `);
  config.BASE_URL = baseUrl || `http://localhost:${config.PORT}`;

  // Configuration admin
  console.log('\n🔐 CONFIGURATION ADMIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  config.ADMIN_PASSWORD = await question('Mot de passe admin (défaut: morpheus2024) : ');
  if (!config.ADMIN_PASSWORD) {
    config.ADMIN_PASSWORD = 'morpheus2024';
  }

  // Configuration Twilio (optionnelle)
  console.log('\n📱 CONFIGURATION SMS (OPTIONNEL)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Pour envoyer des SMS, vous avez besoin d\'un compte Twilio.');
  console.log('Créez-en un gratuitement sur : https://www.twilio.com/try-twilio\n');
  
  const configureSms = await question('Voulez-vous configurer l\'envoi de SMS maintenant ? (o/n) : ');
  
  if (configureSms.toLowerCase() === 'o') {
    config.TWILIO_ACCOUNT_SID = await question('Twilio Account SID : ');
    config.TWILIO_AUTH_TOKEN = await question('Twilio Auth Token : ');
    config.TWILIO_PHONE_NUMBER = await question('Numéro Twilio (format +33...) : ');
  }

  // Environnement
  config.NODE_ENV = 'development';

  // Générer le fichier .env
  console.log('\n📝 Génération du fichier de configuration...');
  
  let envContent = '# Configuration Morpheus Experience - Système d\'Avis Google\n';
  envContent += '# Généré automatiquement le ' + new Date().toLocaleString('fr-FR') + '\n\n';
  
  envContent += '# GOOGLE REVIEWS\n';
  envContent += `GOOGLE_REVIEW_URL=${config.GOOGLE_REVIEW_URL}\n\n`;
  
  envContent += '# SERVEUR\n';
  envContent += `PORT=${config.PORT}\n`;
  envContent += `BASE_URL=${config.BASE_URL}\n`;
  envContent += `NODE_ENV=${config.NODE_ENV}\n\n`;
  
  envContent += '# ADMIN\n';
  envContent += `ADMIN_PASSWORD=${config.ADMIN_PASSWORD}\n\n`;
  
  if (config.TWILIO_ACCOUNT_SID) {
    envContent += '# TWILIO SMS\n';
    envContent += `TWILIO_ACCOUNT_SID=${config.TWILIO_ACCOUNT_SID}\n`;
    envContent += `TWILIO_AUTH_TOKEN=${config.TWILIO_AUTH_TOKEN}\n`;
    envContent += `TWILIO_PHONE_NUMBER=${config.TWILIO_PHONE_NUMBER}\n\n`;
  } else {
    envContent += '# TWILIO SMS (non configuré)\n';
    envContent += '# TWILIO_ACCOUNT_SID=\n';
    envContent += '# TWILIO_AUTH_TOKEN=\n';
    envContent += '# TWILIO_PHONE_NUMBER=\n\n';
  }

  // Écrire le fichier
  fs.writeFileSync(envPath, envContent);

  // Créer le dossier data s'il n'existe pas
  const dataPath = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
    console.log('✓ Dossier data créé');
  }

  // Afficher le récapitulatif
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                 ✅ CONFIGURATION TERMINÉE                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log('📋 Récapitulatif de la configuration :');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   URL Google Reviews : ${config.GOOGLE_REVIEW_URL}`);
  console.log(`   Port serveur        : ${config.PORT}`);
  console.log(`   URL de base         : ${config.BASE_URL}`);
  console.log(`   Mot de passe admin  : ${config.ADMIN_PASSWORD}`);
  console.log(`   SMS configuré       : ${config.TWILIO_ACCOUNT_SID ? '✓ Oui' : '✗ Non'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('🚀 Prochaines étapes :');
  console.log('   1. Lancez le serveur : npm start');
  console.log(`   2. Accédez à l'interface : ${config.BASE_URL}`);
  console.log('   3. Testez la page d\'avis : ' + config.BASE_URL + '/avis');
  console.log('   4. Accédez à l\'admin : ' + config.BASE_URL + '/admin/stats\n');

  if (!config.TWILIO_ACCOUNT_SID) {
    console.log('💡 Pour activer l\'envoi de SMS plus tard :');
    console.log('   - Créez un compte Twilio : https://www.twilio.com/try-twilio');
    console.log('   - Ajoutez vos identifiants dans le fichier .env');
    console.log('   - Relancez le serveur\n');
  }

  console.log('📖 Documentation complète : Consultez INSTALLATION.md\n');
  console.log('Bon courage avec Morpheus Experience ! 🎭✨\n');

  rl.close();
}

// Lancer le setup
setup().catch(error => {
  console.error('❌ Erreur lors de la configuration :', error);
  rl.close();
  process.exit(1);
});
