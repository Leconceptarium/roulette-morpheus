# 🎭 Morpheus Reviews - Système d'Avis Google

## 📦 Contenu du projet

Vous avez téléchargé un système complet et prêt à l'emploi pour collecter des avis Google pour **Morpheus Experience** à Strasbourg.

### ✨ Fonctionnalités principales

1. **Page de redirection élégante** vers Google Reviews
2. **QR Code généré automatiquement** à afficher en boutique
3. **Envoi de SMS automatique** via Twilio (optionnel)
4. **Tableau de bord statistiques** avec graphiques
5. **Interface admin** pour gérer les envois
6. **Tracking des clics** et taux de conversion
7. **Base de données SQLite** intégrée
8. **Design responsive** adapté mobile/desktop

---

## 🚀 Installation ultra-rapide

### Option 1 : Configuration automatique (recommandé)

```bash
# 1. Extraire l'archive
tar -xzf morpheus-reviews.tar.gz
cd morpheus-reviews

# 2. Installer les dépendances
npm install

# 3. Lancer la configuration interactive
npm run setup

# 4. Démarrer le serveur
npm start
```

### Option 2 : Configuration manuelle

```bash
# 1. Extraire et installer
tar -xzf morpheus-reviews.tar.gz
cd morpheus-reviews
npm install

# 2. Copier et configurer .env
cp .env.example .env
nano .env  # Éditez avec vos infos

# 3. Créer le dossier data
mkdir data

# 4. Lancer
npm start
```

Votre application sera accessible sur **http://localhost:3000**

---

## 📝 Configuration minimale requise

Dans le fichier `.env`, vous devez configurer au minimum :

```env
GOOGLE_REVIEW_URL=https://g.page/r/VOTRE_URL_COURTE
BASE_URL=http://localhost:3000
ADMIN_PASSWORD=votre_mot_de_passe
```

### Comment trouver votre GOOGLE_REVIEW_URL ?

**Méthode 1 :** Google Search
1. Tapez "Morpheus Experience Strasbourg" sur Google
2. Cliquez sur votre fiche d'établissement
3. Cliquez sur "Plus d'avis"
4. Cliquez sur "Écrire un avis"
5. Copiez l'URL de cette page

**Méthode 2 :** Google My Business
1. Connectez-vous à [Google Business Profile](https://business.google.com/)
2. Sélectionnez "Morpheus Experience"
3. Allez dans "Accueil" → "Obtenir plus d'avis"
4. Copiez le lien généré

---

## 📱 Configuration SMS (optionnel)

Pour envoyer des SMS de demande d'avis :

1. **Créez un compte Twilio** gratuit : https://www.twilio.com/try-twilio
   - 15$ de crédit offert à l'inscription
   - Un numéro français coûte environ 1$/mois

2. **Récupérez vos identifiants** dans le dashboard Twilio :
   - Account SID
   - Auth Token
   - Votre numéro Twilio

3. **Ajoutez-les dans .env** :
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=votre_token
TWILIO_PHONE_NUMBER=+33123456789
```

---

## 🎨 Structure du projet

```
morpheus-reviews/
│
├── 📄 README.md              Documentation principale
├── 📄 QUICK_START.md         Guide de démarrage rapide
├── 📄 INSTALLATION.md        Guide d'installation détaillé
├── 📄 DEPLOYMENT.md          Guide de mise en production
├── 📄 CONTRIBUTING.md        Guide de contribution
├── 📄 CHANGELOG.md           Historique des versions
│
├── 📄 server.js              Point d'entrée de l'application
├── 📄 package.json           Dépendances et scripts npm
├── 📄 .env.example           Exemple de configuration
│
├── 📁 database/              Gestion de la base de données
│   └── db.js                 Module SQLite
│
├── 📁 routes/                Routes de l'application
│   ├── reviews.js            Gestion des redirections avis
│   ├── sms.js                Envoi de SMS
│   └── admin.js              Interface d'administration
│
├── 📁 views/                 Templates EJS
│   ├── index.ejs             Page d'accueil avec QR code
│   ├── review-page.ejs       Page de redirection avis
│   ├── admin-stats.ejs       Tableau de bord stats
│   ├── admin-send-sms.ejs    Interface d'envoi SMS
│   ├── admin-login.ejs       Page de connexion admin
│   ├── 404.ejs               Page 404
│   └── error.ejs             Page d'erreur
│
├── 📁 public/                Fichiers statiques
│   └── print-qrcode.html     Template imprimable QR Code
│
└── 📁 scripts/               Scripts utilitaires
    └── setup.js              Configuration automatique
```

---

## 🎯 Utilisation quotidienne

### 1️⃣ Générer et imprimer le QR Code

```
1. Démarrez le serveur : npm start
2. Allez sur : http://localhost:3000
3. Le QR Code est affiché automatiquement
4. Cliquez sur "Télécharger PNG" ou imprimez directement
5. Affichez-le bien visible en boutique !
```

### 2️⃣ Envoyer un SMS à un client

```
1. Allez sur : http://localhost:3000/admin/send-sms
2. Mot de passe : celui configuré dans .env
3. Entrez le prénom et téléphone du client
4. Cliquez sur "Envoyer le SMS"
```

Le client recevra un SMS personnalisé avec un lien direct vers Google Reviews.

### 3️⃣ Consulter les statistiques

```
1. Allez sur : http://localhost:3000/admin/stats
2. Vous verrez :
   - Nombre total de clics
   - SMS envoyés
   - Taux de conversion
   - Graphique des 30 derniers jours
   - Liste des SMS récents
```

---

## 🌐 Mise en production

Pour mettre votre système en ligne sur Internet :

### Option 1 : Heroku (gratuit, simple)
```bash
heroku create morpheus-reviews
heroku config:set GOOGLE_REVIEW_URL="votre_url"
git push heroku main
```

### Option 2 : DigitalOcean (5$/mois, plus de contrôle)
Voir le guide complet dans **DEPLOYMENT.md**

### Option 3 : Votre propre serveur
Consultez **DEPLOYMENT.md** pour les instructions détaillées

**Important :** N'oubliez pas de :
- ✅ Changer le mot de passe admin en production
- ✅ Utiliser HTTPS (SSL)
- ✅ Configurer un nom de domaine (ex: avis.morpheus-experience.com)

---

## 📊 Pages disponibles

Une fois démarré, vous pouvez accéder à :

| URL | Description | Accès |
|-----|-------------|-------|
| `/` | Page d'accueil avec QR code | Public |
| `/avis` | Page de redirection vers Google | Public |
| `/admin/stats` | Tableau de bord statistiques | Admin seulement |
| `/admin/send-sms` | Interface d'envoi SMS | Admin seulement |
| `/admin/export/csv` | Export des statistiques | Admin seulement |
| `/public/print-qrcode.html` | QR Code imprimable | Public |

---

## 🔧 Personnalisation

### Changer les couleurs

Éditez les fichiers `.ejs` dans le dossier `views/`

Remplacez les couleurs :
```css
/* Violet actuel */
#667eea et #764ba2

/* Par vos couleurs */
#VOTRECOULEUR1 et #VOTRECOULEUR2
```

### Personnaliser le message SMS

Éditez `routes/sms.js`, ligne 55-68

### Changer le logo

Remplacez les emojis 🎭✨ par votre logo dans les fichiers `.ejs`

---

## 📚 Documentation complète

- **README.md** - Vue d'ensemble du projet
- **QUICK_START.md** - Démarrage ultra-rapide
- **INSTALLATION.md** - Installation pas à pas détaillée
- **DEPLOYMENT.md** - Mise en production (Heroku, VPS, etc.)
- **CONTRIBUTING.md** - Contribuer au projet
- **CHANGELOG.md** - Historique des versions

---

## 🆘 Problèmes fréquents

### Le serveur ne démarre pas
```bash
# Vérifiez Node.js
node --version  # Doit être >= 18

# Réinstallez
rm -rf node_modules
npm install
```

### "GOOGLE_REVIEW_URL not configured"
→ Lancez `npm run setup` ou éditez `.env` manuellement

### Les SMS ne partent pas
→ Vérifiez vos identifiants Twilio dans `.env`

### La base de données ne se crée pas
```bash
mkdir data
chmod 755 data
```

---

## 📞 Support et contact

- 📧 **Email :** contact@morpheus-experience.com
- 🐛 **Bugs :** Créez une issue sur GitHub
- 💡 **Suggestions :** Ouvrez une discussion sur GitHub
- 📖 **Documentation :** Consultez les fichiers .md du projet

---

## ⭐ Remerciements

Ce projet est open source sous licence MIT. N'hésitez pas à :
- ⭐ Mettre une étoile sur GitHub si ça vous plaît
- 🐛 Signaler les bugs que vous trouvez
- 💡 Proposer des améliorations
- 🤝 Contribuer au code

---

## 🎁 Bonus inclus

✅ QR Code auto-généré  
✅ Template imprimable pour affichage  
✅ Script de configuration automatique  
✅ Base de données SQLite pré-configurée  
✅ Interface admin responsive  
✅ Graphiques Chart.js  
✅ Export CSV des statistiques  
✅ Messages SMS personnalisables  
✅ Tracking des conversions  
✅ Documentation complète en français  

---

## 🚀 Prêt à démarrer !

```bash
npm install
npm run setup
npm start
```

**Ouvrez http://localhost:3000 et c'est parti ! 🎭✨**

---

*Créé avec ❤️ pour Morpheus Experience - Strasbourg*  
*Escape Game • Boutique Mystique • Salon de Thé*
