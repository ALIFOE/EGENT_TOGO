/**
 * Composable useAuth
 * Gestion de l'authentification Firebase
 */

import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { auth } from '../lib/firebase'

// État global
const user = ref(null)
const loading = ref(false)
const error = ref('')
const isAuthenticated = computed(() => !!user.value)

/**
 * Initialiser l'observateur d'authentification
 */
export function initializeAuth(callback) {
  return onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    if (callback) callback(currentUser)
  })
}

/**
 * Connexion avec email et mot de passe
 */
export async function login(email, password) {
  error.value = ''
  loading.value = true

  try {
    // Activer la persistance locale
    await setPersistence(auth, browserLocalPersistence)
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
    
    return userCredential.user
  } catch (err) {
    handleAuthError(err)
    throw err
  } finally {
    loading.value = false
  }
}

/**
 * Créer un compte administrateur
 */
export async function registerAdmin(email, password, confirmPassword) {
  error.value = ''
  loading.value = true

  try {
    // Validation
    if (password !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas')
    }
    
    if (password.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères')
    }

    // Activer la persistance locale
    await setPersistence(auth, browserLocalPersistence)
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
    
    return userCredential.user
  } catch (err) {
    handleAuthError(err)
    throw err
  } finally {
    loading.value = false
  }
}

/**
 * Déconnexion
 */
export async function logout() {
  error.value = ''
  loading.value = true

  try {
    await signOut(auth)
    user.value = null
  } catch (err) {
    handleAuthError(err)
    throw err
  } finally {
    loading.value = false
  }
}

/**
 * Gérer les erreurs d'authentification
 */
function handleAuthError(err) {
  const errorMessages = {
    'auth/invalid-email': 'Email invalide',
    'auth/user-disabled': 'Cet utilisateur a été désactivé',
    'auth/user-not-found': 'Utilisateur non trouvé',
    'auth/wrong-password': 'Mot de passe incorrect',
    'auth/email-already-in-use': 'Cet email est déjà utilisé',
    'auth/weak-password': 'Le mot de passe est trop faible',
    'auth/operation-not-allowed': 'Opération non autorisée',
    'auth/network-request-failed': 'Erreur réseau. Vérifiez votre connexion'
  }

  error.value = errorMessages[err.code] || err.message || 'Erreur d\'authentification'
}

/**
 * Retourner le composable
 */
export function useAuth() {
  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    registerAdmin,
    initializeAuth
  }
}
