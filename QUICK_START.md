# 🚀 DÉMARRAGE RAPIDE - Morpheus Reviews

## ⚡ Installation en 3 étapes

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration automatique
```bash
npm run setup
```
→ Répondez aux questions pour configurer automatiquement votre système

### 3. Lancement
```bash
npm start
```

Votre système est prêt ! Accédez à http://localhost:3000

---

## 📋 Ce dont vous avez besoin

### Obligatoire ✅
- **Node.js 18+** ([télécharger](https://nodejs.org/))
- **URL Google Reviews** de votre établissement

### Optionnel 📱
- **Compte Twilio** pour envoyer des SMS ([inscription gratuite](https://www.twilio.com/try-twilio))

---

## 🎯 Trouver votre URL Google Reviews

### Méthode rapide
1. Recherchez "Morpheus Experience Strasbourg" sur Google
2. Cliquez sur votre fiche
3. Cliquez sur "Plus d'avis" puis "Écrire un avis"
4. Copiez l'URL de la page

### Formats acceptés
- `https://g.page/r/XXXXXXXXXXXXX`
- `https://search.google.com/local/writereview?placeid=XXXXX`
- `https://maps.app.goo.gl/XXXXX` (raccourci Google Maps)

---

## 📱 Utilisation quotidienne

### Afficher le QR Code
1. Allez sur http://localhost:3000
2. Le QR Code est affiché automatiquement
3. Imprimez ou téléchargez pour l'afficher en boutique

### Envoyer un SMS à un client
1. http://localhost:3000/admin/send-sms
2. Entrez le prénom et le téléphone
3. Cliquez sur "Envoyer"

### Consulter les statistiques
1. http://localhost:3000/admin/stats
2. Mot de passe par défaut : `morpheus2024`
3. Vous verrez tous vos KPIs et graphiques

---

## 🔧 Personnalisation rapide

### Changer le mot de passe admin
Éditez `.env` :
```env
ADMIN_PASSWORD=votre_nouveau_mdp
```

### Personnaliser le message SMS
Éditez `routes/sms.js` ligne 55

### Changer les couleurs
Éditez les fichiers dans `views/*.ejs`
Cherchez `#667eea` et `#764ba2` et remplacez par vos couleurs

---

## 📊 Structure du projet

```
morpheus-reviews/
├── 📄 README.md              # Documentation principale
├── 📄 INSTALLATION.md        # Guide d'installation détaillé
├── 📄 QUICK_START.md         # Ce fichier
├── 📄 CONTRIBUTING.md        # Guide de contribution
├── 📄 CHANGELOG.md           # Historique des versions
├── 📄 LICENSE                # Licence MIT
├── 📄 package.json           # Dépendances npm
├── 📄 .env.example           # Exemple de configuration
├── 📄 .gitignore             # Fichiers à ignorer
├── 📄 server.js              # Serveur principal
│
├── 📁 database/              # Gestion de la base de données
│   └── db.js                 # Module SQLite
│
├── 📁 routes/                # Routes Express
│   ├── reviews.js            # Routes pour les avis
│   ├── sms.js                # Routes pour les SMS
│   └── admin.js              # Routes admin
│
├── 📁 views/                 # Templates EJS
│   ├── index.ejs             # Page d'accueil
│   ├── review-page.ejs       # Page de redirection
│   ├── admin-stats.ejs       # Tableau de bord
│   ├── admin-send-sms.ejs    # Interface SMS
│   ├── admin-login.ejs       # Page de connexion
│   ├── 404.ejs               # Page 404
│   └── error.ejs             # Page d'erreur
│
├── 📁 public/                # Fichiers statiques
│   └── print-qrcode.html     # Template imprimable QR
│
└── 📁 scripts/               # Scripts utilitaires
    └── setup.js              # Script de configuration
```

---

## 🆘 Problèmes fréquents

### Le serveur ne démarre pas
```bash
# Vérifiez Node.js
node --version  # Doit être >= 18

# Réinstallez les dépendances
rm -rf node_modules
npm install
```

### Erreur "GOOGLE_REVIEW_URL not configured"
→ Lancez `npm run setup` pour configurer votre URL

### Les SMS ne partent pas
→ Vérifiez vos identifiants Twilio dans `.env`
→ Assurez-vous d'avoir du crédit Twilio

### La base de données ne se crée pas
```bash
mkdir data
chmod 755 data
```

---

## 🚀 Mise en production

### Hébergement recommandé
- **Heroku** (gratuit) : Déploiement facile
- **DigitalOcean** : VPS à partir de 5$/mois
- **Vercel** : Gratuit pour les petits projets
- **Railway** : Alternative moderne à Heroku

### Checklist avant mise en ligne
- [ ] Changez `ADMIN_PASSWORD` dans `.env`
- [ ] Configurez `BASE_URL` avec votre domaine
- [ ] Activez HTTPS
- [ ] Testez tous les liens
- [ ] Vérifiez l'envoi de SMS
- [ ] Imprimez le QR Code

---

## 📚 Documentation complète

- **Installation détaillée** : Voir [INSTALLATION.md](INSTALLATION.md)
- **Contribuer au projet** : Voir [CONTRIBUTING.md](CONTRIBUTING.md)
- **Versions et changelog** : Voir [CHANGELOG.md](CHANGELOG.md)

---

## 💬 Support

- 📧 Email : support@morpheus-experience.com
- 🐛 Issues GitHub : [Créer un ticket](https://github.com/votre-repo/issues)
- 💡 Idées : Ouvrir une discussion sur GitHub

---

## ⭐ Ce projet vous plaît ?

N'hésitez pas à :
- ⭐ Mettre une étoile sur GitHub
- 🐛 Signaler les bugs
- 💡 Proposer des améliorations
- 🤝 Contribuer au code

---

**Prêt à collecter des avis ! 🎭✨**

Bon courage avec Morpheus Experience !
