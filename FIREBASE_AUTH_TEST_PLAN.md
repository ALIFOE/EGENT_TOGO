# 🧪 Plan de test Firebase Authentication

## Tests de base

### Test 1: Connexion réussie
```gherkin
Scenario: L'utilisateur se connecte avec des credentials valides
  Given: Je suis sur la page /login
  When: Je rentre admin@egenttogo.com et mon mot de passe
  And: Je clique sur "Se connecter"
  Then: Je suis redirigé vers /admin
  And: Le bouton "Déconnexion" apparaît dans le Header
```

**Résultat attendu**: ✅ Connexion réussie, redirection vers admin

---

### Test 2: Connexion échouée - Email invalide
```gherkin
Scenario: L'utilisateur rentre un email invalide
  Given: Je suis sur la page /login
  When: Je rentre "invalid.email"
  And: Je clique sur "Se connecter"
  Then: Un message d'erreur s'affiche
  And: Le message dit "Email invalide"
```

**Résultat attendu**: ✅ Message d'erreur, pas de connexion

---

### Test 3: Connexion échouée - Mot de passe incorrect
```gherkin
Scenario: L'utilisateur rentre le mauvais mot de passe
  Given: Je suis sur la page /login
  When: Je rentre admin@egenttogo.com
  And: Je rentre un mauvais mot de passe
  And: Je clique sur "Se connecter"
  Then: Un message d'erreur s'affiche
  And: Le message dit "Mot de passe incorrect" ou "Email ou mot de passe incorrect"
```

**Résultat attendu**: ✅ Message d'erreur, pas de connexion

---

### Test 4: Déconnexion
```gherkin
Scenario: L'utilisateur se déconnecte
  Given: Je suis connecté et sur la page /admin
  When: Je clique sur le bouton "Déconnexion" dans le Header
  Then: Je suis redirigé vers la page d'accueil
  And: Le bouton "Déconnexion" disparaît
  And: Essayer d'accéder à /admin me redirige vers /login
```

**Résultat attendu**: ✅ Déconnexion réussie

---

## Tests de protection des routes

### Test 5: Accès à /admin sans authentification
```gherkin
Scenario: Un utilisateur non authentifié essaie d'accéder à /admin
  Given: Je ne suis pas connecté
  When: Je vais à /admin
  Then: Je suis redirigé vers /login
```

**Résultat attendu**: ✅ Redirection vers login

---

### Test 6: Accès à /admin/import sans authentification
```gherkin
Scenario: Un utilisateur non authentifié essaie d'accéder à /admin/import
  Given: Je ne suis pas connecté
  When: Je vais à /admin/import
  Then: Je suis redirigé vers /login
```

**Résultat attendu**: ✅ Redirection vers login

---

### Test 7: Accès à /admin avec authentification
```gherkin
Scenario: Un utilisateur authentifié accède à /admin
  Given: Je suis connecté
  When: Je vais à /admin
  Then: Je vois le contenu de /admin
  And: Je ne suis pas redirigé
```

**Résultat attendu**: ✅ Accès autorisé

---

## Tests de persistance

### Test 8: Persistance après rafraîchissement
```gherkin
Scenario: L'utilisateur reste connecté après rafraîchir la page
  Given: Je suis connecté sur /admin
  When: Je rafraîchis la page (F5)
  Then: Je reste sur /admin
  And: Je reste connecté
  And: Le bouton "Déconnexion" est toujours visible
```

**Résultat attendu**: ✅ Session persistée

---

### Test 9: Persistance après fermeture du navigateur
```gherkin
Scenario: L'utilisateur reste connecté après fermeture du navigateur
  Given: Je suis connecté
  When: Je ferme complètement le navigateur
  And: Je le rouvre
  Then: Je devrais toujours être connecté
  And: Le bouton "Déconnexion" est visible
```

**Résultat attendu**: ✅ Session persistée (dépend du navigateur)

---

## Tests mobile

### Test 10: Formulaire de connexion sur mobile
```gherkin
Scenario: Le formulaire de connexion fonctionne sur mobile
  Given: Je suis sur un appareil mobile (ou en mode responsive)
  When: Je vais à /login
  Then: Le formulaire est responsive
  And: Les boutons sont cliquables
  And: Tous les champs sont accessibles
```

**Résultat attendu**: ✅ Interface responsive

---

### Test 11: Bouton de déconnexion sur mobile
```gherkin
Scenario: Le bouton de déconnexion est accessible sur mobile
  Given: Je suis connecté sur un appareil mobile
  When: Je coche le menu burger
  Then: Je vois le bouton "Déconnexion"
  And: Je peux cliquer dessus
```

**Résultat attendu**: ✅ Déconnexion fonctionnelle

---

## Tests d'UI

### Test 12: Visibilité du mot de passe
```gherkin
Scenario: L'utilisateur peut afficher/masquer le mot de passe
  Given: Je suis sur la page /login
  When: Je clique sur l'icône "Afficher le mot de passe"
  Then: Le mot de passe devient visible
  And: L'icône change
  When: Je clique à nouveau
  Then: Le mot de passe devient masqué
```

**Résultat attendu**: ✅ Toggle fonctionne

---

### Test 13: Checkbox "Se souvenir de moi"
```gherkin
Scenario: L'email est mémorisé quand "Se souvenir de moi" est coché
  Given: Je suis sur la page /login
  When: Je coche "Se souvenir de moi"
  And: Je me connecte
  And: Je me déconnecte
  And: Je vais à /login
  Then: Mon email est pré-rempli
  And: Le checkbox "Se souvenir de moi" est coché
```

**Résultat attendu**: ✅ Email mémorisé

---

## Tests de performance

### Test 14: Temps de connexion
```
Scenario: La connexion se fait rapidement
  Given: Je suis sur la page /login
  When: Je me connecte
  Then: La redirection prend moins de 2 secondes
```

**Résultat attendu**: ✅ < 2 secondes

---

### Test 15: Temps de chargement des pages protégées
```
Scenario: Les pages protégées se chargent vite
  Given: Je suis connecté
  When: Je vais à /admin
  Then: La page se charge en moins de 1 seconde
```

**Résultat attendu**: ✅ < 1 seconde

---

## Tests de sécurité

### Test 16: XSS - Injection de script
```javascript
Email: "<script>alert('XSS')</script>@test.com"
Résultat attendu: L'email est rejeté comme invalide
```

---

### Test 17: Le mot de passe n'est pas loggé
```
Vérifier dans les logs que le mot de passe n'apparaît nulle part
Vérifier dans localStorage que le mot de passe n'est pas stocké
```

**Résultat attendu**: ✅ Mot de passe sécurisé

---

### Test 18: Token n'est pas visible en public
```
Vérifier que les tokens Firebase ne sont pas exposés dans le code source
Vérifier que les tokens sont dans localStorage et httpOnly cookies
```

**Résultat attendu**: ✅ Sécurisé

---

## Tests d'accessibilité

### Test 19: Keyboard navigation
```
Scenario: L'utilisateur peut naviguer au clavier
  Given: Je suis sur /login
  When: J'utilise Tab pour naviguer
  Then: Tous les champs sont accessibles
  And: Je peux soumettre avec Enter
```

**Résultat attendu**: ✅ Navigation au clavier fonctionnelle

---

### Test 20: Lecteur d'écran
```
Scenario: Les labels sont correctement associés aux champs
  Given: Je suis sur /login
  When: J'utilise un lecteur d'écran
  Then: Tous les champs sont lus correctement
  And: Les messages d'erreur sont annoncés
```

**Résultat attendu**: ✅ Accessible aux lecteurs d'écran

---

## Tableau de synthèse

| # | Test | Status | Notes |
|---|------|--------|-------|
| 1 | Connexion réussie | 🔄 | À tester |
| 2 | Email invalide | 🔄 | À tester |
| 3 | Mot de passe incorrect | 🔄 | À tester |
| 4 | Déconnexion | 🔄 | À tester |
| 5 | Pas d'accès à /admin | 🔄 | À tester |
| 6 | Pas d'accès à /admin/import | 🔄 | À tester |
| 7 | Accès à /admin connecté | 🔄 | À tester |
| 8 | Persistance (F5) | 🔄 | À tester |
| 9 | Persistance (fermeture) | 🔄 | À tester |
| 10 | Mobile - Formulaire | 🔄 | À tester |
| 11 | Mobile - Déconnexion | 🔄 | À tester |
| 12 | Visibilité mot de passe | 🔄 | À tester |
| 13 | "Se souvenir de moi" | 🔄 | À tester |
| 14 | Performance - Connexion | 🔄 | À tester |
| 15 | Performance - Pages | 🔄 | À tester |
| 16 | Sécurité - XSS | 🔄 | À tester |
| 17 | Sécurité - Mot de passe | 🔄 | À tester |
| 18 | Sécurité - Token | 🔄 | À tester |
| 19 | Accessibilité - Clavier | 🔄 | À tester |
| 20 | Accessibilité - Lecteur | 🔄 | À tester |

---

## Procédure de test

### Avant de tester
- [ ] Créer un utilisateur test dans Firebase
- [ ] Avoir un navigateur à jour
- [ ] Vider le cache du navigateur
- [ ] Ouvrir la console (F12)

### Pendant le test
- [ ] Noter les résultats
- [ ] Prendre des screenshots en cas d'erreur
- [ ] Vérifier la console pour les erreurs
- [ ] Tester sur plusieurs navigateurs

### Après le test
- [ ] Documenter les issues trouvées
- [ ] Classer par priorité (critique, majeur, mineur)
- [ ] Créer des tickets pour les corrections
- [ ] Réexécuter les tests après correction

---

## Légende des status

| Status | Signification |
|--------|---------------|
| 🟢 ✅ | Test réussi |
| 🔴 ❌ | Test échoué |
| 🟡 🔄 | À tester |
| 🔵 ⏳ | En cours |

---

## Notes et observations

_Ajoutez vos observations ici pendant le test_

```
Date: _______________
Testeur: _______________
Navigateur: _______________
Appareil: _______________
Observations:
_________________________________
_________________________________
_________________________________
```

---

Bon test! 🚀
