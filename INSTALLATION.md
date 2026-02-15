# 🚀 Guide d'Installation Rapide - Morpheus Experience

## Prérequis

Avant de commencer, assurez-vous d'avoir :
- ✅ Node.js 18 ou supérieur installé ([télécharger ici](https://nodejs.org/))
- ✅ Un compte Google My Business actif
- ✅ (Optionnel) Un compte Twilio pour les SMS

## Installation en 5 minutes

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/votre-username/morpheus-reviews.git
cd morpheus-reviews
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Configuration de base

Copiez le fichier d'exemple et renommez-le :

```bash
cp .env.example .env
```

Ouvrez le fichier `.env` et configurez au minimum :

```env
GOOGLE_REVIEW_URL=https://g.page/r/VOTRE_URL_COURTE
BASE_URL=http://localhost:3000
ADMIN_PASSWORD=votre_mot_de_passe_securise
```

### 4️⃣ Trouver votre URL Google Reviews

**Méthode 1 : Via Google Maps**
1. Ouvrez Google Maps
2. Recherchez "Morpheus Experience Strasbourg"
3. Cliquez sur votre établissement
4. Cliquez sur "Partager"
5. Copiez le lien court (format : `https://maps.app.goo.gl/XXXXX`)
6. OU trouvez le lien "Écrire un avis" dans le profil

**Méthode 2 : Via Google My Business**
1. Connectez-vous à [Google Business Profile](https://business.google.com/)
2. Sélectionnez votre établissement
3. Allez dans "Accueil" → "Obtenir plus d'avis"
4. Copiez le lien généré

**Format attendu :**
- `https://g.page/r/XXXXXXXXXXXXX`
- OU `https://search.google.com/local/writereview?placeid=XXXXX`

### 5️⃣ Créer le dossier pour la base de données

```bash
mkdir data
```

### 6️⃣ Lancer l'application

```bash
npm start
```

Vous devriez voir :

```
╔═══════════════════════════════════════════════════════╗
║   🎭 MORPHEUS EXPERIENCE - Système d'Avis Google     ║
║   Serveur démarré sur le port 3000                   ║
║   📱 Page d'avis: http://localhost:3000/avis         ║
╚═══════════════════════════════════════════════════════╝
```

### 7️⃣ Tester l'installation

Ouvrez votre navigateur et allez sur :
- **Page d'accueil :** http://localhost:3000
- **Page d'avis :** http://localhost:3000/avis
- **Admin :** http://localhost:3000/admin/stats

## 📱 Configuration SMS (Optionnel mais recommandé)

### Créer un compte Twilio

1. Allez sur [Twilio](https://www.twilio.com/try-twilio)
2. Inscrivez-vous gratuitement (crédit de 15$ offert)
3. Vérifiez votre numéro de téléphone
4. Obtenez un numéro Twilio français (+33)

### Récupérer vos identifiants

1. Dans le dashboard Twilio, trouvez :
   - **Account SID** (commence par AC...)
   - **Auth Token** (cliquez sur "show")
   - **Votre numéro Twilio** (format +33...)

2. Ajoutez-les dans le fichier `.env` :

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=votre_token_ici
TWILIO_PHONE_NUMBER=+33123456789
```

### Tester l'envoi de SMS

1. Redémarrez le serveur : `npm start`
2. Allez sur : http://localhost:3000/admin/send-sms?password=votre_mot_de_passe
3. Envoyez un SMS de test à votre propre numéro

## 🎨 Personnalisation

### Changer les couleurs

Modifiez les fichiers CSS dans `/views/*.ejs` :

```css
/* Gradient principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Changez par vos couleurs */
background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
```

### Personnaliser le message SMS

Dans `/routes/sms.js`, ligne 55, modifiez le template :

```javascript
const message = `Votre message personnalisé ici...`;
```

## 📊 Utilisation quotidienne

### Afficher le QR Code

1. Allez sur la page d'accueil
2. Le QR Code est généré automatiquement
3. Clic droit → "Enregistrer l'image sous"
4. Imprimez et affichez en boutique

### Envoyer des SMS aux clients

**Option 1 : SMS unique**
```
http://localhost:3000/admin/send-sms
→ Remplissez le formulaire
```

**Option 2 : SMS en masse**
```
http://localhost:3000/admin/send-sms
→ Onglet "SMS en Masse"
→ Collez vos données CSV
```

**Format CSV :**
```
Jean,0612345678
Marie,+33687654321
Pierre,0623456789
```

### Consulter les statistiques

```
http://localhost:3000/admin/stats?password=votre_mot_de_passe
```

Vous verrez :
- 📊 Nombre total de clics
- 💬 SMS envoyés
- ✅ Taux de conversion
- 📈 Graphique des 30 derniers jours

## 🌐 Mise en production

### Option 1 : Déploiement sur Heroku (gratuit)

1. Créez un compte sur [Heroku](https://heroku.com)
2. Installez Heroku CLI
3. Dans le dossier du projet :

```bash
heroku create morpheus-reviews
heroku config:set GOOGLE_REVIEW_URL=votre_url
heroku config:set ADMIN_PASSWORD=votre_mdp
git push heroku main
```

### Option 2 : VPS ou serveur dédié

1. Installez Node.js sur votre serveur
2. Clonez le projet
3. Installez PM2 : `npm install -g pm2`
4. Lancez : `pm2 start server.js --name morpheus-reviews`
5. Configurez Nginx comme proxy inverse

### Nom de domaine personnalisé

Pour un lien plus court type `avis.morpheus.fr` :

1. Achetez un domaine ou sous-domaine
2. Configurez un CNAME pointant vers votre serveur
3. Mettez à jour `BASE_URL` dans `.env`
4. Configurez un certificat SSL (Let's Encrypt)

## 🆘 Dépannage

### Le serveur ne démarre pas

```bash
# Vérifier que Node.js est installé
node --version

# Vérifier les dépendances
npm install
```

### Erreur "GOOGLE_REVIEW_URL not configured"

→ Vérifiez que votre fichier `.env` contient bien :
```env
GOOGLE_REVIEW_URL=https://...
```

### Les SMS ne s'envoient pas

1. Vérifiez vos identifiants Twilio dans `.env`
2. Assurez-vous d'avoir du crédit Twilio
3. Vérifiez les logs du serveur pour l'erreur exacte

### La base de données ne se crée pas

```bash
# Créez le dossier manuellement
mkdir data

# Vérifiez les permissions
chmod 755 data
```

## 📞 Support

Pour toute question :
- 📧 Email : support@morpheus-experience.com
- 🐛 GitHub Issues : [Créer un ticket](https://github.com/votre-repo/issues)

## ✅ Checklist de mise en production

- [ ] Changé le mot de passe admin
- [ ] Configuré l'URL Google Reviews
- [ ] Testé la redirection
- [ ] Configuré Twilio (si SMS)
- [ ] Testé l'envoi de SMS
- [ ] Généré et imprimé le QR Code
- [ ] Configuré un nom de domaine
- [ ] Activé HTTPS
- [ ] Testé sur mobile
- [ ] Configuré les sauvegardes de la DB

---

**Prêt à collecter des avis ! 🎉**
