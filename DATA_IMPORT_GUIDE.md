# 📥 Guide d'Import de Données dans Firebase

## ✅ Ce qui a été fait

Un système complet d'import a été créé pour ajouter tous les produits, articles et projets existants dans Firebase Realtime Database.

### Fichiers Créés:

1. **`src/composables/useDataImport.js`**
   - Composable Vue.js avec fonctions d'import
   - Importe les produits, articles et projets
   - Gère l'affichage du statut et de la progression

2. **`src/pages/DataImport.vue`**
   - Page dédiée à l'import avec interface utilisateur
   - Affiche la progression et les statistiques
   - Boutons pour importer individuellement ou tout ensemble

3. **Routes mises à jour**
   - Route `/admin/import` ajoutée dans le router
   - Accessible via un bouton 📥 dans le header du tableau de bord admin

## 🚀 Comment Utiliser

### Étape 1: Vérifier les Règles de Sécurité Firebase

Avant d'importer, assurez-vous que Firebase est configuré en mode TEST (permet lecture/écriture):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Pour modifier les règles:**
1. Allez sur https://console.firebase.google.com
2. Sélectionnez votre projet (egenttogo-edc4e)
3. Realtime Database → Onglet "Rules"
4. Collez les règles TEST ci-dessus
5. Cliquez "Publish"

### Étape 2: Accéder à la Page d'Import

1. Connectez-vous au tableau de bord admin (`/admin`)
2. Identifiants:
   - Email: `admin@egenttogo.com`
   - Mot de passe: `password123`
3. Cliquez sur le bouton **📥 Importer Données**

### Étape 3: Lancer l'Import

Vous avez plusieurs options:

#### Option A: Importer Tout (Recommandé)
- Cliquez sur **"🚀 Importer Tout"**
- Cela importera tous les produits, articles et projets en une seule opération
- Temps estimé: 10-15 secondes

#### Option B: Importer Sélectivement
- **📦 Produits** - Importe les 4 produits existants
- **📰 Articles** - Importe les 4 articles d'actualité
- **🏗️ Projets** - Importe les 4 projets réalisés

### Étape 4: Vérifier le Succès

Après l'import, vous verrez:
- ✅ Message de confirmation avec le nombre d'éléments importés
- 📊 Statistiques mises à jour en temps réel
- 🟢 Les données apparaîtront immédiatement sur:
  - `/produits` - Page des produits
  - `/actualites` - Page des actualités/news
  - `/projets` - Page des projets (galerie)

## 📊 Données qui seront Importées

### Produits (4 articles)
1. **Armoire Billy** - Solution anti-délestage (500,000 FCFA)
2. **Lampadaires EGENT SOLAR** - Énergie solaire (200,000 FCFA)
3. **Kit Zoklin** - Kit solaire complet (750,000 FCFA)
4. **Free Water** - Purification d'eau solaire (350,000 FCFA)

### Articles (4 actualités)
1. Inauguration du nouveau centre de formation
2. Partenariat international stratégique
3. Prix et reconnaissance dans l'industrie
4. Expansion de l'équipe - Ressources Humaines

### Projets (4 réalisations)
1. Installation Solaire Résidentielle - Lomé
2. Système de Climatisation Commercial - Kofi
3. Rénovation Électrique Hôtel 3 étoiles - Aného
4. Installation Solaire Ferme Piscicole - Tsévié

## ⚙️ Architecture Technique

### Sources de Données
- Les données sont stockées dans des fichiers JS:
  - `src/data/products.js`
  - `src/data/articles.js`
  - `src/data/projects.js`

### Destination Firebase
- **Base de données:** egenttogo-edc4e (Realtime Database)
- **Collections:**
  - `/products` - Tous les produits
  - `/news` - Tous les articles/actualités
  - `/gallery` - Tous les projets/galerie

### Flux de Données
```
Fichiers de données JS
    ↓
Composable useDataImport
    ↓
Firebase Realtime Database
    ↓
Composables useFirebaseData (écoute en temps réel)
    ↓
Pages publiques (Products, News, Gallery)
```

## 🔄 Synchronisation en Temps Réel

Une fois les données importées:

1. **Les pages publiques** (`/produits`, `/actualites`, `/projets`) affichent automatiquement les données via Firebase
2. **Les modifications** dans l'admin se reflètent instantanément sur les pages publiques
3. **Les nouvelles données** créées dans l'admin s'ajoutent aux pages publiques en temps réel

## ⚠️ Notes Importantes

### Avant Production
- ❌ Ne laissez PAS les règles en mode TEST en production
- ✅ Configurez des règles de sécurité appropriées basées sur Firebase Auth
- ✅ Implémentez une authentification Firebase appropriée

### Limitations Actuelles
- Le système utilise localStorage pour l'authentification (développement)
- Les règles TEST permettent les lectures/écritures sans restriction
- Pas de validation côté serveur des données

### Optimisations Futures
- [ ] Migrer vers Firebase Authentication
- [ ] Configurer des règles de sécurité granulaires
- [ ] Ajouter validation côté serveur
- [ ] Configurer les index Firebase pour les requêtes complexes
- [ ] Implémenter les sauvegardes automatiques

## 🐛 Dépannage

### L'import échoue avec "PERMISSION_DENIED"
- ✅ Vérifiez que les règles Firebase sont en mode TEST
- ✅ Vérifiez que la base de données Realtime est créée
- ✅ Vérifiez la connexion internet

### Les données n'apparaissent pas après l'import
- ✅ Actualisez la page (`F5`)
- ✅ Vérifiez la console (F12 → Console) pour les erreurs
- ✅ Vérifiez que Firebase est connecté (vérifiez le projet ID)

### L'import est très lent
- Les données grandes images peuvent ralentir l'import
- Le réseau peut être lent
- Attendez 20-30 secondes pour un import complet

## 📞 Support

Pour plus d'aide:
- Vérifiez les logs console (F12 → Console)
- Regardez la console Firebase en temps réel
- Assurez-vous que les fichiers de données existent dans `src/data/`

---

**Statut:** ✅ Prêt à l'emploi
**Dernière mise à jour:** 17 janvier 2026
