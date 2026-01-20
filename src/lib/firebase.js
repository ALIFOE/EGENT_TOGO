/**
 * Configuration Firebase
 * 1. Créer un projet Firebase sur https://console.firebase.google.com
 * 2. Créer une Realtime Database en mode TEST (accessible à tous pour développement)
 * 3. Copier votre config depuis Project Settings > Your apps
 * 4. Remplacer les valeurs ci-dessous
 */

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// ⚠️ CONFIGURATION FIREBASE - EGENT-TOGO
const firebaseConfig = {
  apiKey: "AIzaSyAMdQcFCUcZd6Lqj2oyb6VZRKd2Z_PvDcI",
  authDomain: "egenttogo-edc4e.firebaseapp.com",
  databaseURL: "https://egenttogo-edc4e-default-rtdb.firebaseio.com",
  projectId: "egenttogo-edc4e",
  storageBucket: "egenttogo-edc4e.firebasestorage.app",
  messagingSenderId: "359885972724",
  appId: "1:359885972724:web:6b8da32020f60ac6926aa1"
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

/**
 * Fonctions utilitaires Firebase
 */

// Récupérer les données en temps réel
export function listenToData(ref, callback) {
  return onValue(ref, (snapshot) => {
    const data = snapshot.val()
    // Convertir de Firebase format vers Array
    const items = data ? Object.entries(data).map(([id, item]) => ({
      ...item,
      id
    })) : []
    callback(items)
  })
}

// Ajouter un élément
export async function addItem(ref, data) {
  try {
    const newRef = push(ref)
    await set(newRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    return newRef.key
  } catch (error) {
    console.error('Erreur ajout:', error)
    throw error
  }
}

// Mettre à jour un élément
export async function updateItem(ref, id, data) {
  try {
    const itemRef = dbRef(database, `${ref.path}/${id}`)
    await update(itemRef, {
      ...data,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Erreur mise à jour:', error)
    throw error
  }
}

// Supprimer un élément
export async function deleteItem(ref, id) {
  try {
    const itemRef = dbRef(database, `${ref.path}/${id}`)
    await remove(itemRef)
  } catch (error) {
    console.error('Erreur suppression:', error)
    throw error
  }
}
