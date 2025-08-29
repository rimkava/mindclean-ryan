# MindClean 🔥

Application de nettoyage mental avec une interface élégante et chaleureuse. Organisez vos pensées quotidiennes avec deux modes : "Vider ma tête" et "Se confier".

## 🌟 Pages disponibles

- **`landing.html`** - Landing page attractive avec présentation des fonctionnalités
- **`index.html`** - Application MindClean complète

## 🚀 Démarrage rapide

1. **Pour découvrir l'application** : Ouvrez `landing.html` dans votre navigateur
2. **Pour utiliser MindClean** : Cliquez sur "Accéder à l'app" ou ouvrez `index.html`

## 🚀 Déploiement sur Netlify

### Prérequis

- Un compte [GitHub](https://github.com) (gratuit)
- Un compte [Netlify](https://netlify.com) (gratuit)

### Étapes de déploiement

#### 1. Préparer le dépôt GitHub

1. Créez un nouveau dépôt sur GitHub
2. Poussez tous les fichiers du projet vers votre dépôt :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - MindClean app"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
   git push -u origin main
   ```

#### 2. Déployer sur Netlify

**Option A : Déploiement automatique depuis GitHub (recommandé)**

1. Connectez-vous à [Netlify](https://app.netlify.com)
2. Cliquez sur "Add new site" → "Import an existing project"
3. Choisissez "Deploy with GitHub"
4. Autorisez Netlify à accéder à votre compte GitHub
5. Sélectionnez votre dépôt MindClean
6. Netlify détectera automatiquement la configuration :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
7. Cliquez sur "Deploy site"

**Option B : Déploiement manuel**

1. Connectez-vous à [Netlify](https://app.netlify.com)
2. Cliquez sur "Sites"
3. Glissez-déposez le dossier `dist` (après avoir exécuté `npm run build`)

#### 3. Configuration après déploiement

Votre application sera automatiquement configurée avec :
- ✅ Routage SPA activé
- ✅ Headers de sécurité configurés
- ✅ Optimisations de build activées

### 🔧 Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview
```

### 📁 Structure du projet

```
mindclean-app/
├── landing.html         # Landing page attractive
├── index.html           # Application MindClean
├── src/
│   ├── main.jsx          # Point d'entrée React
│   └── index.css         # Styles Tailwind + animations
├── public/
│   └── _redirects        # Configuration routage Netlify
├── mindclean-app.tsx     # Composant principal
├── package.json         # Dépendances et scripts
├── netlify.toml         # Configuration Netlify
├── vite.config.js       # Configuration Vite
├── tailwind.config.js   # Configuration Tailwind
└── postcss.config.js    # Configuration PostCSS
```

### 🎨 Fonctionnalités de l'application

- **Deux modes séparés** : "Vider ma tête" (pratique) et "Se confier" (émotionnel)
- **Classification automatique** des pensées dans 4 catégories
- **Suppression rapide** : Bouton ✕ ou double-clic
- **Interface élégante** avec thème chaleureux
- **Statistiques hebdomadaires** et suivi de streak
- **Export des données** au format texte par mode
- **Design responsive** pour mobile et desktop

## 🌟 Fonctionnalités de la landing page

- **Hero section** avec présentation accrocheuse
- **Navigation fluide** vers l'application
- **Présentation des deux modes** avec exemples visuels
- **Section fonctionnalités** avec cartes interactives
- **Témoignages utilisateurs** pour la crédibilité
- **Statistiques d'engagement** (10K+ pensées organisées)
- **Design responsive** et animations élégantes
- **Call-to-action** multiples pour inciter à l'action

### 🔒 Sécurité

L'application est configurée avec des headers de sécurité :
- Protection contre les attaques XSS
- Prévention du clickjacking
- Protection contre les MIME sniffing

### 🌐 Accès à l'application

Après déploiement, Netlify vous fournira une URL au format :
`https://NOM_ALEATOIRE.netlify.app`

Vous pouvez personnaliser cette URL dans les paramètres de votre site Netlify.

---

## 🎨 Utilisation de la landing page

**Pour une première impression optimale :**
- Ouvrez `landing.html` pour découvrir MindClean de façon attrayante
- La landing page présente les fonctionnalités et suscite l'envie
- Bouton "Accéder à l'app" redirige vers `index.html`

**Pour définir la landing page comme page d'accueil :**
Si vous voulez que `landing.html` soit la page d'accueil de votre site, configurez Netlify pour rediriger la racine vers `landing.html` au lieu d'`index.html`.

**MindClean** - Prenez soin de votre flamme intérieure 🔥❤️

