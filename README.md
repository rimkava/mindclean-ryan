# MindClean 🔥

Application de nettoyage mental avec une interface élégante et chaleureuse. Organisez vos pensées quotidiennes avec deux modes : "Vider ma tête" et "Se confier".

## 🌟 Fonctionnalités principales

**Page unique intégrée (`index.html`)** :
- ✅ **Landing page attractive** - Présentation du service avec design émotionnel
- ✅ **Navigation fluide** - Bouton "Utiliser l'app" pour accéder à l'application
- ✅ **Application complète** - Tous les modes séparés et fonctionnalités
- ✅ **Navigation retour** - Bouton "Retour à l'accueil" dans l'app

## 🚀 Démarrage rapide

1. **Ouvrez `index.html`** dans votre navigateur
2. **Découvrez MindClean** sur la landing page
3. **Cliquez sur "Utiliser l'app"** pour accéder à l'application complète
4. **Utilisez "Retour à l'accueil"** pour revenir à la présentation

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
├── index.html           # Landing page + Application intégrée
├── index_backup.html    # Sauvegarde de l'ancienne version
├── src/
│   ├── main.jsx          # Point d'entrée React
│   └── index.css         # Styles Tailwind + animations
├── public/
│   └── _redirects        # Configuration routage Netlify
├── mindclean-app.tsx     # Composant principal avec séparation des modes
├── package.json         # Dépendances et scripts
├── netlify.toml         # Configuration Netlify
├── vite.config.js       # Configuration Vite
├── tailwind.config.js   # Configuration Tailwind
└── postcss.config.js    # Configuration PostCSS
```

### 🎨 Fonctionnalités complètes

**Landing page intégrée :**
- ✅ **Présentation attractive** - Hero section émotionnelle avec animations
- ✅ **Navigation fluide** - Bouton "Utiliser l'app" pour accéder à l'application
- ✅ **Design responsive** - Adapté mobile et desktop
- ✅ **Call-to-action** multiples pour inciter à l'action

**Application MindClean :**
- ✅ **Deux modes séparés** - "Vider ma tête" et "Se confier" avec données indépendantes
- ✅ **Classification automatique** - 4 catégories intuitives par mode
- ✅ **Suppression rapide** - Bouton ✕ toujours visible + double-clic
- ✅ **Navigation retour** - Bouton "Retour à l'accueil" dans l'app
- ✅ **Statistiques par mode** - Suivi séparé pour chaque mode
- ✅ **Export différencié** - Export par mode avec titre approprié
- ✅ **Interface élégante** - Thème chaleureux cohérent

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

## 🎨 Utilisation intégrée

**Expérience utilisateur complète :**
- ✅ **Un seul fichier** : `index.html` contient tout
- ✅ **Landing page** : Présentation attractive au chargement
- ✅ **Navigation fluide** : Bouton "Utiliser l'app" → Application
- ✅ **Retour facile** : Bouton "Retour à l'accueil" dans l'app

**Flux utilisateur :**
1. **Ouverture** : Landing page avec présentation
2. **Découverte** : Fonctionnalités et témoignages
3. **Action** : Clic "Utiliser l'app" pour l'application
4. **Utilisation** : Modes séparés avec toutes les fonctionnalités
5. **Retour** : Bouton "Retour à l'accueil" pour revenir

**MindClean** - Prenez soin de votre flamme intérieure 🔥❤️

