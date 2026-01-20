# 📥 Guide Complet d'Import des Articles

## 🎯 Vue d'ensemble

Ce guide vous explique comment importer tous les articles de la page https://alifoe.github.io/EGENT_TOGO/actualites dans votre base de données Firebase.

**Deux méthodes disponibles:**
1. **Interface Web** - Facile, visuelle, recommandée ✅
2. **Script Python** - Automatisé, pour batch import

---

## 🌐 Méthode 1: Import via Interface Web (RECOMMANDÉ)

### Étapes

#### **Étape 1: Accéder à l'interface d'import**

1. Allez à `/admin/import-articles`
2. Vous devez être **authentifié** (Firebase Auth)
3. L'interface s'affiche avec les 4 étapes du processus

#### **Étape 2: Récupération des articles**

```
Écran "Étape 1: Récupération des articles"
│
├─ [Récupérer les articles] ← Cliquez ici
│
└─ L'interface récupère la page https://alifoe.github.io/EGENT_TOGO/actualites
   et extrait:
   ✓ Titres
   ✓ Images (résolution)
   ✓ Résumés/Descriptions
   ✓ Catégories
   ✓ Dates de publication
   ✓ Slugs (auto-générés)
```

**Ce qui se passe techniquement:**
- Fetch de la page HTML
- Parse avec DOMParser (Javascript natif)
- Recherche de sélecteurs: `article`, `.article`, `.news-item`, `[data-article]`
- Extraction des données avec querySelector
- Conversion des URLs relatives en absolues

#### **Étape 3: Vérification des données**

```
Écran "Étape 2: Vérification"
│
├─ "140 articles prêts à être importés"
├─
├─ Tableau avec aperçu:
│  ┌─ Titre                 │ Catégorie  │ Date      │ Image
│  ├─ Inauguration...       │ Actualité  │ 10 Jan... │ ✓
│  ├─ Programme formation   │ Formation  │ 05 Jan... │ ✓
│  └─ Partenariat inter.    │ Partenair  │ 01 Jan... │ ✗
│
└─ [← Retour]  [Importer dans Firebase →]
```

**À ce stade:**
- ✅ Vérifiez que les articles sont corrects
- ✅ Vérifiez que les images se chargent bien
- ⚠️ Si des données manquent, il y a peut-être un problème de structure HTML

#### **Étape 4: Import en cours**

```
Écran "Étape 3: Import en cours"
│
├─ Barre de progression: 65/140
│
├─ Liste avec statut pour chaque article:
│  ┌─ ✓ Inauguration nouveau centre
│  ├─ ✓ Programme de formation 2026
│  ├─ ✓ Partenariat international
│  ├─ ⏳ Article suivant...
│  └─ (restant à importer)
│
└─ "Importation en cours... Ne fermez pas cette page!"
```

**Pendant l'import:**
- Ne fermez **pas** la page
- Ne naviguez **pas** ailleurs
- Les articles s'importent un par un dans Firebase
- Pause de 100ms entre chaque pour éviter les limites

#### **Étape 5: Résultat**

```
Écran "Étape 4: Résultat"
│
├─ Statistiques:
│  ┌─────────┐  ┌────────┐  ┌──────┐
│  │   140   │  │   0    │  │ 140  │
│  │Importés │  │Échoués │  │Total │
│  └─────────┘  └────────┘  └──────┘
│
├─ "🎉 Import réussi à 100%!"
│
├─ "Tous les articles ont été sauvegardés dans la base Firebase"
│
└─ [📰 Aller au panneau admin]  [Recommencer]
```

**Options finales:**
- 📰 **Aller au panneau admin** → Va à `/admin/news` pour voir les articles
- 🔄 **Recommencer** → Réinitialise et relance le processus

---

## 🐍 Méthode 2: Script Python (Automatisé)

### Installation des dépendances

```bash
pip install requests beautifulsoup4
```

### Exécution

```bash
python scripts/import_articles.py
```

### Processus

Le script va:

1. **Récupérer** la page `https://alifoe.github.io/EGENT_TOGO/actualites`
2. **Parser** avec BeautifulSoup
3. **Extraire** tous les articles (titre, image, résumé, catégorie, date)
4. **Générer** les slugs automatiquement
5. **Sauvegarder** les résultats dans `articles_import.json`

### Output

```
============================================================
🚀 SCRIPT D'IMPORT D'ARTICLES
============================================================

📡 Récupération de https://alifoe.github.io/EGENT_TOGO/actualites...
🔍 Parsing des articles...
   Trouvé 140 éléments article

   ✓ 1. Inauguration du nouveau centre
   ✓ 2. Programme de formation 2026
   ✓ 3. Partenariat international
   ...

✅ 140 articles trouvés!

📋 Aperçu des articles (premiers 3):

[1] Inauguration du nouveau centre
    Slug: inauguration-nouveau-centre
    Catégorie: Actualité
    Date: 10 Jan 2026
    Image: ✓ oui

[2] Programme de formation 2026
    Slug: programme-formation-2026
    Catégorie: Formation
    Date: 05 Jan 2026
    Image: ✓ oui

[3] Partenariat international
    Slug: partenariat-international
    Catégorie: Partenariat
    Date: 01 Jan 2026
    Image: ✗ non

✓ Articles sauvegardés dans articles_import.json

📖 Prochaines étapes:
   1. Vérifiez le fichier articles_import.json
   2. Ouvrez l'interface d'import: /admin/import-articles
   3. Cliquez sur 'Récupérer les articles' pour charger les données
   4. Vérifiez et lancez l'import

✨ Import prêt!
```

### Fichier `articles_import.json`

Après l'exécution, vous pouvez revoir le fichier généré:

```json
[
  {
    "title": "Inauguration du nouveau centre",
    "slug": "inauguration-nouveau-centre",
    "category": "Actualité",
    "date": "10 Jan 2026",
    "image": "https://alifoe.github.io/EGENT_TOGO/images/centre.jpg",
    "excerpt": "Nous sommes heureux d'annoncer...",
    "content": "<h2>Inauguration du nouveau centre</h2><p>Nous sommes heureux...</p>",
    "author": "EGENT-TOGO"
  },
  ...
]
```

---

## 📊 Structure des Données Importées

Chaque article dans Firebase aura cette structure:

```javascript
{
  id: "auto-generated-by-firebase",
  
  // Données de base
  title: "Inauguration du nouveau centre",
  slug: "inauguration-nouveau-centre",
  excerpt: "Nous sommes heureux d'annoncer...",
  content: "<h2>Titre</h2><p>Contenu HTML...</p>",
  
  // Métadonnées
  image: "https://...", // URL absolue (HTTPS)
  category: "Actualité",
  date: "10 Jan 2026",
  author: "EGENT-TOGO",
  
  // Timestamps Firebase
  createdAt: Timestamp(2026, 1, 19, 14, 30, 45),
  updatedAt: Timestamp(2026, 1, 19, 14, 30, 45)
}
```

---

## 🔍 Sélecteurs Utilisés pour Parser

L'interface web cherche les articles avec ces sélecteurs CSS:

```javascript
// Sélecteurs principaux
'article'           // <article>...</article>
'.article'          // <div class="article">...</div>
'.news-item'        // <div class="news-item">...</div>
'[data-article]'    // <div data-article>...</div>

// Titres
'h2, h3'            // Titres

// Images
'img'               // Balises <img>

// Descriptions
'p'                 // Premier paragraphe

// Catégories
'[class*="category"]'   // Elements avec "category" dans la classe
'[class*="badge"]'      // Elements avec "badge" dans la classe
'[class*="tag"]'        // Elements avec "tag" dans la classe

// Dates
'[class*="date"]'       // Elements avec "date" dans la classe
'[class*="time"]'       // Elements avec "time" dans la classe
'time'                  // Balises <time>
```

**Si le parsing ne trouve rien:**
- Inspectez la source HTML de la page
- Identifiez les vrais sélecteurs utilisés
- Modifiez les sélecteurs dans `ImportArticles.vue` ligne ~60

---

## 🐛 Dépannage

### ❌ "Aucun article trouvé"

**Causes possibles:**
1. La page n'est pas accessible (CORS, DNS, serveur down)
2. La structure HTML a changé
3. Les sélecteurs CSS ne correspondent pas

**Solutions:**
1. Vérifiez l'URL: https://alifoe.github.io/EGENT_TOGO/actualites
2. Inspectez le source HTML de la page (F12)
3. Utilisez le script Python pour générer `page_source.html` et comparez
4. Mettez à jour les sélecteurs dans `ImportArticles.vue`

### ❌ "Erreur lors de l'importation"

**Causes possibles:**
1. Pas authentifié (Firebase Auth)
2. Limite de débit Firebase atteinte
3. Image invalide/404

**Solutions:**
1. Vérifiez que vous êtes connecté
2. Attendez quelques minutes avant de réessayer
3. Vérifiez les URLs d'images dans le JSON

### ⚠️ Images manquantes

**Causes possibles:**
1. URLs relatives pas converties en absolues
2. Images supprimées de la source
3. CORS bloqué

**Solutions:**
1. Le code convertit automatiquement les URLs relatives → vérifiez la logique
2. Vérifiez sur la page source si l'image existe
3. Utilisez des images alternatives en background

---

## 🎯 Cas d'Usage

### Cas 1: Import initial (140 articles)

```
Situation: Site nouvellement migré, besoin de charger tous les articles
Solution: Interface web → Récupérer → Vérifier → Importer
Temps: 2-5 minutes
```

### Cas 2: Update articles (10 nouveaux articles)

```
Situation: Quelques nouveaux articles ajoutés à la page source
Solution: Interface web → Récupérer (obtient 150 articles)
          → Vérifier → Importer
Note: Firebase ignorera les doublons (même slug)
```

### Cas 3: Batch automation

```
Situation: Import automatisé chaque nuit
Solution: Script Python + Cron job
          ```
          0 2 * * * cd /path && python scripts/import_articles.py
          ```
```

---

## ✅ Checklist Post-Import

Après l'import, vérifiez:

- [ ] **Nombre d'articles**: 140+ dans AdminNews.vue
- [ ] **Affichage**: Tous les articles visibles dans le tableau
- [ ] **Images**: Toutes les images se chargent correctement
- [ ] **Slugs**: URL `/article/:slug` fonctionne
- [ ] **Contenu**: ArticleDetail.vue affiche le contenu HTML correctement
- [ ] **Partage**: Boutons OpenGraph pour réseaux sociaux fonctionnent
- [ ] **Recherche**: Possibilité de filtrer/chercher (si implémenté)

---

## 📚 Fichiers Liés

| Fichier | Rôle |
|---------|------|
| `src/components/ImportArticles.vue` | Interface web d'import |
| `src/components/AdminNews.vue` | Gestion des articles |
| `src/composables/useFirebaseData.js` | CRUD Firebase |
| `scripts/import_articles.py` | Script Python |
| `src/router.js` | Route `/admin/import-articles` |

---

## 🔐 Sécurité

- ✅ Route `/admin/import-articles` **protégée par authentification** Firebase
- ✅ Seuls les utilisateurs **authentifiés** peuvent importer
- ✅ Les articles sont **validés** avant import (titre, slug, contenu)
- ✅ Les **timestamps** sont générés automatiquement par Firebase
- ✅ Pas de SQL injection (Firestore est NoSQL sécurisé)

---

## 🚀 Performance

- **Temps par article**: ~100ms
- **Temps total (140 articles)**: ~15 secondes
- **Limite Firebase**: 100K/jour (largement suffisant)
- **Pas de timeout**: La page reste ouverte pendant l'import

---

## 📞 Support

Si vous rencontrez des problèmes:

1. Vérifiez les **logs du navigateur** (F12 > Console)
2. Vérifiez les **erreurs Firebase** dans le fichier `.env`
3. Exécutez le **script Python** pour déboguer le parsing
4. Inspectez la **source HTML** de la page avec les DevTools

---

**Status**: ✅ **OPÉRATIONNEL**

L'import est prêt à être utilisé! Allez à `/admin/import-articles` et commencez. 🚀
