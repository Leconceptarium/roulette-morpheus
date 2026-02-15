# 🎭 Morpheus Experience - Système d'Avis Google

Système automatisé pour encourager vos clients à laisser des avis Google après leur visite chez Morpheus Experience (Escape Game, Boutique Mystique & Salon de Thé).

## 🌟 Fonctionnalités

- **Page de redirection élégante** avec l'ambiance mystique de Morpheus
- **🎰 Roue de fidélité gamifiée** pour encourager les avis avec des cadeaux
- **SMS automatiques** pour rappeler aux clients de laisser un avis
- **QR Code** à afficher en boutique
- **Statistiques** des avis collectés et des prix gagnés
- **Interface admin** pour gérer les envois et valider les codes promo
- **Design responsive** adapté mobile/desktop

## 🚀 Installation Rapide

### Prérequis
- Node.js 18+ 
- Un compte Twilio (pour les SMS)
- L'ID de votre fiche Google My Business

### Configuration

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/morpheus-reviews.git
cd morpheus-reviews
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` :
```env
# URL de votre fiche Google My Business
GOOGLE_PLACE_ID=votre_place_id_ici
GOOGLE_REVIEW_URL=https://g.page/r/votre_url_courte

# Configuration Twilio (optionnel, pour les SMS)
TWILIO_ACCOUNT_SID=votre_sid
TWILIO_AUTH_TOKEN=votre_token
TWILIO_PHONE_NUMBER=+33123456789

# Configuration générale
PORT=3000
BASE_URL=https://votre-domaine.com
```

4. Trouvez votre Place ID Google :
   - Allez sur [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Cherchez "Morpheus Experience Strasbourg"
   - Copiez le Place ID

5. Lancez l'application :
```bash
npm start
```

## 📱 Utilisation

### 1. Page de redirection
Accédez à : `https://votre-domaine.com/avis`

Cette page redirige automatiquement vers Google Reviews avec un message de remerciement.

### 2. QR Code à imprimer
Générez un QR Code pointant vers votre page : `https://votre-domaine.com/avis`

Outils recommandés :
- [QR Code Generator](https://www.qr-code-generator.com/)
- Inclus dans le dossier `/assets/qr-codes/`

### 3. Envoi de SMS automatique
```javascript
// API pour envoyer un SMS
POST /api/send-review-request
{
  "phone": "+33612345678",
  "customerName": "Jean"
}
```

### 4. Lien court personnalisé
Créez un lien court type : `morpheus.reviews` ou `avis.morpheus.fr`

## 🎰 Roue de Fidélité

Une fonctionnalité innovante pour **gamifier** la collecte d'avis !

### Comment ça marche ?

1. **Client laisse un avis** sur Google Reviews ⭐
2. **Il accède à la roue** de fidélité 🎰
3. **Il tourne et gagne** un cadeau mystère 🎁
4. **Il reçoit un code promo** à utiliser lors de sa prochaine visite

### Accès à la roue

```
http://localhost:3000/roue?reviewed=true
```

### Prix disponibles (personnalisables)

- 🎁 10% de réduction
- ☕ Boisson offerte  
- 🎮 1 jeu gratuit
- 💎 15% de réduction
- 🎁 Cadeau mystère
- 🍰 Café + pâtisserie
- ⭐ 20% de réduction
- 👑 Carte fidélité VIP

### Statistiques de la roue

Tableau de bord dédié : `/admin/wheel-stats`

- Nombre de prix gagnés
- Codes utilisés vs en attente
- Taux d'utilisation
- Répartition des prix (graphique)

**📖 Guide complet** : Consultez [WHEEL_GUIDE.md](WHEEL_GUIDE.md)

## 🎨 Personnalisation

Modifiez les fichiers suivants pour adapter à votre image :
- `/public/css/style.css` - Couleurs et styles
- `/public/images/` - Logo et images
- `/views/review-page.html` - Contenu de la page

## 📊 Statistiques

Tableau de bord disponible sur : `/admin/stats`

Suivez :
- Nombre de clics sur le lien
- Taux de conversion
- Avis laissés par période

## 🛠️ Technologies Utilisées

- **Backend** : Node.js + Express
- **SMS** : Twilio API
- **Frontend** : HTML5, CSS3, JavaScript vanilla
- **Base de données** : SQLite (ou PostgreSQL pour production)

## 📝 License

MIT License - Libre d'utilisation et de modification

## 💡 Support

Pour toute question : contact@morpheus-experience.com

---

Créé avec ❤️ pour Morpheus Experience - Strasbourg 🎭🔮☕
