# 🎰 Guide d'Utilisation - Roue de Fidélité

## 🎯 Concept

La **roue de fidélité** est un système gamifié qui encourage vos clients à laisser des avis Google en leur offrant une chance de gagner un cadeau mystère.

### Comment ça fonctionne ?

1. **Client visite votre établissement** → Expérience Morpheus
2. **Vous lui demandez un avis** → Scannez le QR code ou cliquez sur le lien
3. **Client laisse un avis sur Google** → Évaluation 5 étoiles ⭐
4. **Client accède à la roue** → Bonus : Tournez la roue !
5. **Client gagne un cadeau** → Code promo à utiliser
6. **Client revient** → Fidélisation garantie ! 🎁

---

## 🎨 Les Prix Disponibles

La roue contient **8 sections** avec différents cadeaux :

| 🎁 Prix | 🏷️ Code Exemple | 💰 Valeur |
|---------|-----------------|-----------|
| **10% de réduction** | MORPHEUS10 | Réduction sur tout |
| **Boisson offerte** | DRINK2024 | Café, thé, soda |
| **1 jeu gratuit** | FREEGAME | Escape game gratuit |
| **15% de réduction** | MORPHEUS15 | Réduction importante |
| **Cadeau mystère** | MYSTERY | Surprise boutique |
| **Café + pâtisserie** | SWEET2024 | Combo gourmand |
| **20% de réduction** | MORPHEUS20 | Grosse réduction |
| **Carte fidélité VIP** | VIP2024 | Avantages exclusifs |

### 💡 Personnalisation

Vous pouvez facilement modifier les prix en éditant le fichier `/public/wheel.html` ligne 224 :

```javascript
const prizes = [
    { text: 'Votre prix', color: '#FF6B6B', icon: '🎁', code: 'VOTRECODE' },
    // Ajoutez autant de prix que vous voulez (8 recommandé)
];
```

---

## 🚀 Mise en Place

### Étape 1 : Activer la roue

La roue est déjà intégrée ! Aucune configuration supplémentaire nécessaire.

### Étape 2 : Tester la roue

```bash
# Démarrez le serveur
npm start

# Accédez à la roue
http://localhost:3000/roue?reviewed=true
```

Le paramètre `?reviewed=true` simule qu'un avis a été laissé.

### Étape 3 : Intégrer dans votre workflow

**Option A : Après l'avis Google**
- Le client laisse un avis
- Il est automatiquement redirigé vers Google Reviews
- Sur la page, il voit un bouton "🎰 Tourner la roue"
- Il clique et gagne son cadeau

**Option B : QR Code séparé**
- Créez un QR code pointant vers `/roue`
- Le client doit d'abord laisser un avis pour débloquer la roue
- Affichez ce QR code en boutique

**Option C : Via SMS**
- Modifiez le message SMS pour inclure la roue
- "Laissez un avis et tournez la roue : [lien]"

---

## 📱 Utilisation en Boutique

### Scénario 1 : À la caisse

```
Caissier : "Merci pour votre visite ! 😊 
            Vous pouvez laisser un avis et tenter 
            de gagner un cadeau en scannant ce QR code !"

[Client scanne le QR code]
[Client laisse son avis]
[Client tourne la roue]
[Client gagne un code promo]

Caissier : "Super ! Notez votre code : [CODE]
            Vous pourrez l'utiliser lors de votre 
            prochaine visite !"
```

### Scénario 2 : Par SMS

```
SMS : "Bonjour Jean ! Merci d'avoir visité Morpheus 🎭
       
       Laissez-nous un avis et tournez la roue 
       pour gagner un cadeau ! 🎁
       
       👉 [lien vers /roue]
       
       L'équipe Morpheus ✨"
```

### Scénario 3 : Affichage en boutique

Imprimez un panneau :

```
╔══════════════════════════════════════╗
║                                      ║
║     🎰 TOURNEZ LA ROUE ! 🎁         ║
║                                      ║
║   1. Scannez le QR code              ║
║   2. Laissez votre avis              ║
║   3. Gagnez un cadeau !              ║
║                                      ║
║         [QR CODE ICI]                ║
║                                      ║
╚══════════════════════════════════════╝
```

---

## 🔧 Gestion des Codes Promo

### Voir les codes gagnés

```
http://localhost:3000/admin/wheel-stats?password=votre_mdp
```

Vous verrez :
- 📊 Nombre total de prix gagnés
- ✅ Codes utilisés
- ⏳ Codes en attente
- 📈 Graphique de répartition des prix

### Valider un code promo

**Manuellement :**
1. Le client présente son code
2. Allez sur `/admin/wheel-stats`
3. Cherchez le code dans la liste
4. Vérifiez qu'il n'est pas déjà utilisé
5. Appliquez la réduction
6. Marquez comme "utilisé" en base de données

**Via API :**
```javascript
// Vérifier si un code est valide
GET /api/validate-code/MORPHEUS10

// Réponse
{
  "success": true,
  "valid": true,
  "message": "Code valide"
}

// Marquer comme utilisé
POST /api/use-code
{
  "code": "MORPHEUS10"
}
```

### Intégration avec votre caisse

Si vous avez une caisse informatisée, vous pouvez intégrer l'API :

```python
# Exemple Python
import requests

def validate_promo_code(code):
    response = requests.get(f"http://localhost:3000/api/validate-code/{code}")
    data = response.json()
    
    if data['valid']:
        # Appliquer la réduction
        apply_discount(code)
        
        # Marquer comme utilisé
        requests.post("http://localhost:3000/api/use-code", 
                     json={"code": code})
        
        return True
    return False
```

---

## 📊 Statistiques

### Métriques importantes

1. **Taux de participation** : % de clients qui tournent la roue
2. **Taux d'utilisation** : % de codes utilisés
3. **Prix les plus populaires** : Quels cadeaux attirent le plus
4. **Temps moyen avant utilisation** : Délai entre gain et utilisation

### Tableau de bord

Accédez à `/admin/wheel-stats` pour voir :

```
┌─────────────────────────────────────┐
│  🎁 Prix gagnés          145       │
│  ✅ Codes utilisés        98       │
│  📈 Taux utilisation     67.6%     │
│  ⏳ Codes en attente      47       │
└─────────────────────────────────────┘

📊 Répartition des prix :
- 10% réduction : 28 fois
- Boisson offerte : 24 fois
- 1 jeu gratuit : 19 fois
[...]
```

---

## 💡 Conseils & Astuces

### 1. Optimisez vos prix

- **Mélangez petits et gros lots** : Gardez l'excitation
- **Assurez que tout le monde gagne** : Pas de case "perdu"
- **Variez la valeur** : De 5€ à 50€ selon votre budget

### 2. Créez l'urgence

```
"⏰ Code valable 30 jours !"
"🎁 Utilisable dès aujourd'hui !"
"💎 Offre limitée à 100 codes !"
```

### 3. Gamifiez davantage

- **Badges** : "5ème avis = bonus spécial"
- **Saisons** : Prix spéciaux à Noël, Pâques, etc.
- **Challenges** : "Tous les lundis, doublez vos chances"

### 4. Communiquez

- **Instagram** : Partagez les gagnants
- **Facebook** : Stories avec la roue
- **Sur place** : Tableau des gagnants du mois

---

## 🎨 Personnalisation Avancée

### Changer les couleurs de la roue

Éditez `/public/wheel.html` :

```javascript
const prizes = [
    { 
        text: 'Votre prix', 
        color: '#FF6B6B',  // 👈 Changez cette couleur
        icon: '🎁', 
        code: 'CODE123' 
    },
];
```

### Ajouter plus de sections

Ajoutez simplement des objets dans le tableau `prizes` :

```javascript
const prizes = [
    // ... vos 8 prix existants
    { text: 'Nouveau prix', color: '#123456', icon: '🆕', code: 'NEW2024' },
    { text: 'Encore un prix', color: '#654321', icon: '🎊', code: 'BONUS' },
    // La roue s'adapte automatiquement !
];
```

### Modifier la durée de rotation

```javascript
const duration = 4000; // 👈 Changez ici (en millisecondes)
// 3000 = 3 secondes (rapide)
// 5000 = 5 secondes (normal)
// 8000 = 8 secondes (suspense maximum)
```

---

## 🔒 Sécurité

### Prévenir la triche

1. **IP tracking** : La roue enregistre l'IP
2. **Rate limiting** : 1 spin par IP par jour (à configurer)
3. **Codes uniques** : Chaque code ne peut être utilisé qu'une fois

### Ajouter un rate limit (optionnel)

Installez `express-rate-limit` :

```bash
npm install express-rate-limit
```

Puis dans `/routes/wheel.js` :

```javascript
const rateLimit = require('express-rate-limit');

const wheelLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 heures
  max: 1, // 1 tentative par jour
  message: 'Vous avez déjà tourné la roue aujourd\'hui !'
});

router.get('/roue', wheelLimiter, (req, res) => {
  // ...
});
```

---

## 🆘 Dépannage

### La roue ne tourne pas

1. Vérifiez la console du navigateur (F12)
2. Assurez-vous que JavaScript est activé
3. Testez sur un autre navigateur

### Les codes ne sont pas enregistrés

1. Vérifiez que la base de données est accessible
2. Regardez les logs du serveur : `npm start`
3. Vérifiez la table `wheel_prizes` existe

### Les statistiques ne s'affichent pas

```bash
# Vérifiez les routes
npm start

# Testez l'API
curl http://localhost:3000/api/wheel-stats
```

---

## 📞 Support

Pour toute question sur la roue :
- 📧 Email : support@morpheus-experience.com
- 🐛 GitHub : Ouvrir une issue
- 💬 Chat : Dans l'interface admin

---

**Amusez-vous bien avec la roue de fidélité ! 🎰✨**
