# 🔧 Commandes Firebase essentielles pour les emails

## Installation & Configuration

### Installer Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase projects:list
```

---

## Déploiement des Cloud Functions

### Déployer uniquement les functions
```bash
firebase deploy --only functions
```

### Déployer avec logs détaillés
```bash
firebase deploy --only functions --debug
```

### Déployer une fonction spécifique
```bash
firebase deploy --only functions:onQuoteSubmitted
```

---

## Gestion des variables d'environnement

### Voir les variables actuelles
```bash
firebase functions:config:get
```

### Ajouter/modifier une variable
```bash
firebase functions:config:set gmail.user="egenttogo@gmail.com"
firebase functions:config:set gmail.app_password="xxxx xxxx xxxx xxxx"
firebase functions:config:set admin.email="concealiphe4@gmail.com"
```

### Supprimer une variable
```bash
firebase functions:config:unset gmail.user
```

---

## Monitoring & Logs

### Voir les logs en temps réel
```bash
firebase functions:log --follow
```

### Voir les logs d'une fonction spécifique
```bash
firebase functions:log --function=onQuoteSubmitted
```

### Voir les logs des 50 dernières entrées
```bash
firebase functions:log --limit=50
```

### Exporter les logs
```bash
firebase functions:log > logs.txt
```

---

## Lister les fonctions

### Lister toutes les fonctions déployées
```bash
firebase functions:list
```

### Exemple de sortie:
```
✓ onQuoteSubmitted - firestore.v1.onDocumentCreate
✓ prerender - cloudfunctions.https.onRequest
```

---

## Supprimer une fonction

### Supprimer une fonction spécifique
```bash
firebase functions:delete onQuoteSubmitted
```

### Supprimer plusieurs fonctions
```bash
firebase functions:delete onQuoteSubmitted prerender
```

---

## Développement local

### Lancer les émulateurs localement
```bash
firebase emulators:start
```

### Lancer uniquement l'émulateur functions
```bash
firebase emulators:start --only functions
```

### Voir les logs de l'émulateur
```bash
firebase emulators:start --only functions --debug
```

---

## Gestion des secrets (Production)

### Ajouter un secret
```bash
firebase functions:secrets:set GMAIL_APP_PASSWORD
# Puis entrer la valeur
```

### Voir les secrets
```bash
firebase functions:secrets:list
```

### Supprimer un secret
```bash
firebase functions:secrets:destroy GMAIL_APP_PASSWORD
```

---

## Déploiement complet

### Déployer tout (Hosting + Functions)
```bash
firebase deploy
```

### Déployer uniquement Hosting
```bash
firebase deploy --only hosting
```

### Déployer uniquement Firestore Rules
```bash
firebase deploy --only firestore:rules
```

---

## Utilitaires

### Vérifier la configuration Firebase
```bash
firebase use
firebase use egenttogo-edc4e
```

### Voir le statut du projet
```bash
firebase projects:list
```

### Initialiser un nouveau projet
```bash
firebase init
firebase init functions
```

---

## Tests

### Tester une fonction localement
```bash
firebase emulators:start --only functions
# L'émulateur lancera sur http://localhost:5001
```

### Ajouter un devis de test via Firestore
```bash
# Via la console ou avec Admin SDK
db.collection('quotes').add({
  firstName: 'Test',
  lastName: 'User',
  email: 'test@gmail.com',
  phone: '+228 92 03 15 35',
  service: 'panneaux-solaires',
  serviceName: 'Panneaux solaires',
  status: 'new'
})
```

---

## 🔍 Commandes utiles pour le débogage

### Vérifier que les variables sont bien configurées
```bash
firebase functions:config:get | grep -i gmail
```

### Voir le historique des déploiements
```bash
firebase functions:log --limit=100
```

### Voir uniquement les erreurs
```bash
firebase functions:log | grep -i error
```

### Voir les logs récents (dernière heure)
```bash
firebase functions:log --follow
# Attendre que quelque chose se passe...
Ctrl+C pour arrêter
```

---

## Workflow complet

### 1. Développement local
```bash
firebase emulators:start --only functions
```

### 2. Vérifier la configuration
```bash
firebase functions:config:get
```

### 3. Déployer
```bash
firebase deploy --only functions --debug
```

### 4. Vérifier le déploiement
```bash
firebase functions:list
```

### 5. Suivre les logs
```bash
firebase functions:log --follow
```

---

## ⚠️ Erreurs courantes & solutions

### "Fonction non trouvée"
```bash
firebase deploy --only functions
firebase functions:list
```

### "Variable not found"
```bash
firebase functions:config:set gmail.app_password="xxxx xxxx xxxx xxxx"
```

### "Authentication failed"
```bash
# Le mot de passe Gmail est incorrect
# Vérifier sur: https://myaccount.google.com/security
firebase functions:config:set gmail.app_password="<nouveau_mot_de_passe>"
firebase deploy --only functions
```

### "Timeout"
```bash
# Augmenter le timeout lors du déploiement
firebase functions:config:set functions.timeout=300
firebase deploy --only functions
```

---

## 📝 Alias et raccourcis utiles

### Dans ~/.bashrc ou ~/.bash_profile:
```bash
alias fdeploy='firebase deploy --only functions'
alias flogs='firebase functions:log --follow'
alias flist='firebase functions:list'
alias fconfig='firebase functions:config:get'
```

### Utilisation:
```bash
fdeploy    # Deploy
flogs      # Voir les logs
flist      # Lister les fonctions
fconfig    # Voir la config
```

---

## 🎯 Checklist déploiement

```
PRE-DEPLOIEMENT:
[ ] firebase login (authentifié)
[ ] firebase use egenttogo-edc4e (bon projet)
[ ] Variables d'env configurées (firebase functions:config:get)
[ ] npm install (dans functions/)
[ ] Pas d'erreurs de syntaxe

DEPLOIEMENT:
[ ] firebase deploy --only functions
[ ] Attendre que ce soit terminé
[ ] firebase functions:list (vérifier)

POST-DEPLOIEMENT:
[ ] firebase functions:log (voir les logs)
[ ] Tester sur https://www.egenttogo.com/#/quote
[ ] Vérifier la réception des emails
```

---

## 📞 Aide rapide

```bash
firebase help
firebase deploy --help
firebase functions --help
firebase functions:log --help
```

---

**Version:** 1.0.0  
**Mis à jour:** 28 janvier 2026
