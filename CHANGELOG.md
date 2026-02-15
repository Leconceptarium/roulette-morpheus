# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2024-02-15

### 🎉 Version initiale

Cette première version comprend toutes les fonctionnalités de base pour gérer les avis Google.

#### ✨ Ajouté
- Page de redirection vers Google Reviews avec design Morpheus
- Système de tracking des clics sur le lien d'avis
- Envoi de SMS automatique via Twilio
- Interface d'administration avec authentification
- Tableau de bord avec statistiques détaillées :
  - Nombre total de clics
  - SMS envoyés
  - Taux de conversion
  - Graphique des 30 derniers jours
- Envoi de SMS unique et en masse
- Génération automatique de QR Code
- Base de données SQLite intégrée
- Script de configuration automatique (`npm run setup`)
- Documentation complète :
  - README.md
  - INSTALLATION.md
  - CONTRIBUTING.md
- Template imprimable pour QR Code
- Export des statistiques en CSV
- Support multi-environnement (dev/prod)

#### 🔧 Technique
- Stack : Node.js + Express + EJS
- Base de données : SQLite
- SMS : Intégration Twilio
- QR Code : Génération dynamique
- Charts : Chart.js pour les graphiques
- Responsive design
- Sécurité : Helmet.js, authentification admin

#### 📁 Structure du projet
```
morpheus-reviews/
├── database/           # Gestion SQLite
├── routes/             # Routes Express
│   ├── reviews.js      # Routes avis
│   ├── sms.js          # Routes SMS
│   └── admin.js        # Routes admin
├── views/              # Templates EJS
├── public/             # Assets statiques
├── scripts/            # Scripts utilitaires
└── server.js           # Point d'entrée
```

#### 🌐 Routes disponibles
- `GET /` - Page d'accueil avec QR code
- `GET /avis` - Page de redirection vers Google
- `GET /avis/direct` - Redirection immédiate
- `GET /avis/sms/:id` - Tracking des SMS
- `POST /api/send-review-request` - Envoi SMS unique
- `POST /api/send-bulk-review-requests` - Envoi SMS masse
- `GET /admin/stats` - Tableau de bord
- `GET /admin/send-sms` - Interface d'envoi SMS
- `GET /admin/export/csv` - Export CSV

---

## [À venir]

### 🚀 Version 1.1.0 (Planifié)
- [ ] Support multi-langues (FR/EN)
- [ ] Notifications par email
- [ ] Webhook pour automatisations
- [ ] Templates de messages SMS personnalisables
- [ ] Export PDF des statistiques
- [ ] Mode sombre

### 🔮 Version 2.0.0 (Futur)
- [ ] Support PostgreSQL
- [ ] API REST complète
- [ ] Intégration avec d'autres plateformes (Trustpilot, etc.)
- [ ] Application mobile
- [ ] Tableau de bord avancé
- [ ] A/B testing des messages

---

## Comment lire ce changelog

- **Ajouté** : Nouvelles fonctionnalités
- **Modifié** : Changements de fonctionnalités existantes
- **Déprécié** : Fonctionnalités qui seront supprimées
- **Supprimé** : Fonctionnalités supprimées
- **Corrigé** : Corrections de bugs
- **Sécurité** : Correctifs de sécurité

## Versions

Le numéro de version suit le format MAJOR.MINOR.PATCH :
- **MAJOR** : Changements incompatibles avec les versions précédentes
- **MINOR** : Nouvelles fonctionnalités compatibles
- **PATCH** : Corrections de bugs compatibles
