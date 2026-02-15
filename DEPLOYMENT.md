# 🌐 Guide de Déploiement - Morpheus Reviews

Ce guide vous explique comment déployer votre application sur différentes plateformes d'hébergement.

---

## 🚀 Heroku (Gratuit / Facile)

### Avantages
- ✅ Gratuit pour débuter (avec quelques limitations)
- ✅ Très facile à configurer
- ✅ SSL automatique
- ✅ Git deploy simple

### Installation

1. **Créez un compte** sur [Heroku](https://heroku.com)

2. **Installez Heroku CLI**
```bash
# macOS
brew install heroku/brew/heroku

# Windows
# Téléchargez depuis https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

3. **Connectez-vous**
```bash
heroku login
```

4. **Créez l'application**
```bash
cd morpheus-reviews
heroku create morpheus-reviews-prod
```

5. **Configurez les variables d'environnement**
```bash
heroku config:set GOOGLE_REVIEW_URL="https://g.page/r/VOTRE_URL"
heroku config:set ADMIN_PASSWORD="votre_mdp_securise"
heroku config:set NODE_ENV="production"

# Si vous utilisez Twilio
heroku config:set TWILIO_ACCOUNT_SID="ACxxxxx"
heroku config:set TWILIO_AUTH_TOKEN="xxxxx"
heroku config:set TWILIO_PHONE_NUMBER="+33xxxxxx"
```

6. **Déployez**
```bash
git push heroku main
```

7. **Ouvrez votre app**
```bash
heroku open
```

### Personnaliser le domaine

```bash
heroku domains:add avis.morpheus-experience.com
```

Puis configurez un CNAME chez votre registrar pointant vers le domaine Heroku.

---

## 🔷 DigitalOcean (VPS - 5$/mois)

### Avantages
- ✅ Contrôle total
- ✅ Pas de limitations
- ✅ Performance excellente
- ✅ 5$/mois pour un petit VPS

### Installation

1. **Créez un Droplet** (Ubuntu 22.04 recommandé)

2. **Connectez-vous via SSH**
```bash
ssh root@votre-ip
```

3. **Installez Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

4. **Installez PM2** (gestionnaire de processus)
```bash
npm install -g pm2
```

5. **Clonez votre projet**
```bash
cd /var/www
git clone https://github.com/votre-repo/morpheus-reviews.git
cd morpheus-reviews
```

6. **Installez les dépendances**
```bash
npm install --production
```

7. **Configurez .env**
```bash
nano .env
# Copiez vos variables d'environnement
```

8. **Lancez avec PM2**
```bash
pm2 start server.js --name morpheus-reviews
pm2 save
pm2 startup
```

9. **Installez Nginx** (reverse proxy)
```bash
apt-get install nginx

# Créez la config
nano /etc/nginx/sites-available/morpheus
```

Contenu du fichier :
```nginx
server {
    listen 80;
    server_name avis.morpheus-experience.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

10. **Activez le site**
```bash
ln -s /etc/nginx/sites-available/morpheus /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

11. **Installez SSL avec Let's Encrypt**
```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d avis.morpheus-experience.com
```

---

## ⚡ Vercel (Gratuit / Moderne)

### Avantages
- ✅ 100% gratuit pour usage personnel
- ✅ Déploiement ultra-rapide
- ✅ SSL automatique
- ✅ CDN global

### Installation

1. **Installez Vercel CLI**
```bash
npm install -g vercel
```

2. **Connectez-vous**
```bash
vercel login
```

3. **Déployez**
```bash
cd morpheus-reviews
vercel
```

4. **Configurez les variables d'environnement**
```bash
vercel env add GOOGLE_REVIEW_URL production
vercel env add ADMIN_PASSWORD production
vercel env add NODE_ENV production
```

5. **Redéployez**
```bash
vercel --prod
```

**Note :** Vercel fonctionne mieux avec les apps serverless. Vous devrez peut-être adapter le code.

---

## 🚂 Railway (Alternative moderne à Heroku)

### Avantages
- ✅ Gratuit jusqu'à 5$/mois d'usage
- ✅ Très simple
- ✅ Interface moderne
- ✅ Support PostgreSQL intégré

### Installation

1. Allez sur [Railway.app](https://railway.app)
2. Cliquez sur "Start a New Project"
3. Sélectionnez "Deploy from GitHub repo"
4. Choisissez votre repo `morpheus-reviews`
5. Railway détecte automatiquement Node.js
6. Ajoutez vos variables d'environnement dans l'interface
7. Déployez !

---

## 🐳 Docker (Pour experts)

### Dockerfile

Créez un fichier `Dockerfile` :

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN mkdir -p data

EXPOSE 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GOOGLE_REVIEW_URL=${GOOGLE_REVIEW_URL}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

### Lancer avec Docker

```bash
docker-compose up -d
```

---

## 🔒 Sécurité en Production

### Checklist de sécurité

- [ ] **Changez TOUS les mots de passe par défaut**
- [ ] **Activez HTTPS/SSL** (Let's Encrypt gratuit)
- [ ] **Configurez un pare-feu** (ufw sur Ubuntu)
- [ ] **Limitez les tentatives de connexion** admin
- [ ] **Mettez à jour régulièrement** les dépendances
- [ ] **Sauvegardez la base de données** régulièrement
- [ ] **Activez les logs** de sécurité
- [ ] **Utilisez des tokens forts** pour Twilio

### Sauvegardes automatiques

Créez un cron job pour sauvegarder la DB :

```bash
# Ouvrez crontab
crontab -e

# Ajoutez cette ligne (backup quotidien à 3h du matin)
0 3 * * * cp /var/www/morpheus-reviews/data/reviews.db /backups/reviews-$(date +\%Y\%m\%d).db
```

---

## 📊 Monitoring

### Avec PM2 (sur VPS)

```bash
# Voir les logs en temps réel
pm2 logs morpheus-reviews

# Voir les stats
pm2 monit

# Redémarrer en cas de crash
pm2 restart morpheus-reviews
```

### Avec Heroku

```bash
# Voir les logs
heroku logs --tail

# Metrics
heroku metrics
```

---

## 🌍 Domaine personnalisé

### Chez votre registrar (OVH, Gandi, etc.)

1. Allez dans la gestion DNS
2. Ajoutez un enregistrement :
   - Type : **A** (pour VPS) ou **CNAME** (pour Heroku/Vercel)
   - Nom : **avis** (ou votre choix)
   - Valeur : Votre IP serveur ou domaine hébergeur
   - TTL : 3600

3. Attendez la propagation DNS (jusqu'à 48h, souvent quelques minutes)

---

## 💰 Comparaison des coûts

| Plateforme | Prix/mois | Avantages | Inconvénients |
|------------|-----------|-----------|---------------|
| **Heroku** | Gratuit* | Facile, SSL auto | Limitations gratuites |
| **Railway** | 5$ max | Moderne, simple | Jeune plateforme |
| **Vercel** | Gratuit | Très rapide | Orienté serverless |
| **DigitalOcean** | 5$ | Contrôle total | Nécessite config |
| **VPS OVH** | 3.50€ | Français, pas cher | Configuration manuelle |

*Limitations : sleep après 30min d'inactivité sur le plan gratuit

---

## 🆘 Dépannage en production

### L'app ne démarre pas
```bash
# Vérifiez les logs
pm2 logs  # ou heroku logs --tail

# Vérifiez les variables d'env
env | grep GOOGLE_REVIEW_URL
```

### Erreur de base de données
```bash
# Vérifiez les permissions
ls -la data/
chmod 755 data
```

### Le domaine ne fonctionne pas
```bash
# Testez la résolution DNS
nslookup avis.morpheus-experience.com

# Vérifiez Nginx
nginx -t
systemctl status nginx
```

---

## 📞 Support

Pour toute question sur le déploiement :
- 📧 Email : devops@morpheus-experience.com
- 🐛 GitHub Issues : [Créer un ticket](https://github.com/votre-repo/issues)

---

**Bonne mise en production ! 🚀**
