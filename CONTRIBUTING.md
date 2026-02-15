# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à Morpheus Reviews ! Ce projet est open source et nous accueillons toutes les contributions.

## 🎯 Comment contribuer

### Signaler un bug 🐛

Si vous trouvez un bug, veuillez :
1. Vérifier qu'il n'a pas déjà été signalé dans les [Issues](https://github.com/votre-repo/morpheus-reviews/issues)
2. Créer une nouvelle issue avec :
   - Une description claire du bug
   - Les étapes pour le reproduire
   - Le comportement attendu vs le comportement actuel
   - Votre environnement (OS, Node.js version, etc.)

### Proposer une fonctionnalité 💡

Pour proposer une nouvelle fonctionnalité :
1. Ouvrez une issue avec le tag `enhancement`
2. Décrivez la fonctionnalité et son utilité
3. Discutez-en avec la communauté

### Soumettre une Pull Request 🚀

1. **Fork** le projet
2. Créez une **branche** pour votre fonctionnalité (`git checkout -b feature/ma-super-fonctionnalite`)
3. **Committez** vos changements (`git commit -m 'Ajout d\'une super fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/ma-super-fonctionnalite`)
5. Ouvrez une **Pull Request**

## 📝 Standards de code

### JavaScript
- Utiliser ES6+ (const, let, arrow functions, etc.)
- Indentation : 2 espaces
- Points-virgules requis
- Noms de variables en camelCase
- Commentaires clairs pour les fonctions complexes

### Structure des commits
```
type(scope): description courte

Description plus longue si nécessaire

Fixes #123
```

Types de commit :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, points-virgules manquants, etc.
- `refactor`: Refactorisation du code
- `test`: Ajout de tests
- `chore`: Mise à jour des dépendances, etc.

## 🧪 Tests

Avant de soumettre une PR :
```bash
# Installer les dépendances
npm install

# Lancer les tests (quand implémentés)
npm test

# Vérifier le code
npm run lint
```

## 🏗️ Architecture du projet

```
morpheus-reviews/
├── database/       # Gestion de la base de données
├── routes/         # Routes Express
├── views/          # Templates EJS
├── public/         # Fichiers statiques
├── scripts/        # Scripts utilitaires
└── server.js       # Point d'entrée
```

## 💬 Communication

- **Issues GitHub** : Pour bugs et fonctionnalités
- **Pull Requests** : Pour contributions de code
- **Discussions** : Pour questions générales

## 🎨 Idées de contributions

Voici quelques idées si vous voulez contribuer mais ne savez pas par où commencer :

### Fonctionnalités
- [ ] Support multi-langues (i18n)
- [ ] Intégration avec d'autres plateformes d'avis (Trustpilot, etc.)
- [ ] Export des statistiques en PDF
- [ ] Notifications par email
- [ ] API REST documentée
- [ ] Dashboard avec plus de graphiques
- [ ] Mode sombre pour l'interface admin
- [ ] Système de templates de messages SMS personnalisables
- [ ] Intégration avec Zapier/Make
- [ ] Application mobile (React Native)

### Amélioration du code
- [ ] Ajouter des tests unitaires
- [ ] Ajouter des tests d'intégration
- [ ] Améliorer la documentation du code
- [ ] Optimiser les requêtes SQL
- [ ] Ajouter un système de cache
- [ ] Migration vers TypeScript
- [ ] Containerisation Docker

### Documentation
- [ ] Tutoriels vidéo
- [ ] Guide de déploiement détaillé
- [ ] FAQ
- [ ] Exemples d'utilisation
- [ ] Traductions de la documentation

## 📜 Code de conduite

### Nos engagements

Dans l'intérêt de favoriser un environnement ouvert et accueillant, nous nous engageons à :
- Être respectueux des différents points de vue
- Accepter les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté
- Faire preuve d'empathie envers les autres membres

### Comportements inacceptables

- Langage ou images à connotation sexuelle
- Trolling, commentaires insultants ou dégradants
- Harcèlement public ou privé
- Publication d'informations privées sans permission
- Tout comportement qui serait considéré comme inapproprié dans un cadre professionnel

## 🙏 Remerciements

Un grand merci à tous nos contributeurs !

<!-- Sera rempli automatiquement avec les contributeurs GitHub -->

## 📧 Contact

Pour toute question : contact@morpheus-experience.com

---

**Merci de contribuer à rendre Morpheus Reviews meilleur ! 🎭✨**
