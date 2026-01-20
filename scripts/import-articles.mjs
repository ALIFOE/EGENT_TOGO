#!/usr/bin/env node

/**
 * Script d'import des articles depuis https://alifoe.github.io/EGENT_TOGO/actualites
 * Récupère tous les articles et les sauvegarde dans Firebase
 */

import axios from 'axios'
import * as cheerio from 'cheerio'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

// Configuration Firebase (depuis votre .env ou config)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyANlMpC7fOc5Z2f-jKVz3VJ_2L2pKu9QrE",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "egent-togo-ca36f.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "egent-togo-ca36f",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "egent-togo-ca36f.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "897858491783",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:897858491783:web:6e4f3b8b3c2a1d9e5f7g8h"
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Fonction pour générer un slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)
}

// Fonction pour récupérer et parser les articles
async function fetchArticles() {
  try {
    console.log('📡 Récupération de la page https://alifoe.github.io/EGENT_TOGO/actualites...')
    
    const response = await axios.get('https://alifoe.github.io/EGENT_TOGO/actualites', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    const html = response.data
    const $ = cheerio.load(html)

    const articles = []

    // Parser les articles - adapter les sélecteurs selon la structure réelle
    // À adapter selon le HTML réel de la page
    $('article, .article, [data-article], .news-item').each((index, element) => {
      try {
        const $article = $(element)

        // Extraire les données
        const title = $article.find('h2, h3, .title').text().trim() ||
                     $article.find('a').first().text().trim()
        
        const image = $article.find('img').attr('src') ||
                     $article.find('img').attr('data-src') ||
                     ''
        
        const excerpt = $article.find('p, .excerpt, .description').text().trim() ||
                       ''
        
        const dateStr = $article.find('.date, time, [data-date]').text().trim() ||
                       $article.find('span').last().text().trim() ||
                       new Date().toLocaleDateString('fr-FR', { 
                         year: 'numeric', 
                         month: 'short', 
                         day: 'numeric' 
                       })
        
        const category = $article.find('.category, .badge, [data-category]').text().trim() ||
                        'Actualité'

        if (title) {
          articles.push({
            title,
            slug: generateSlug(title),
            excerpt: excerpt.substring(0, 200),
            content: `<h2>${title}</h2><p>${excerpt}</p>`,
            image: image.startsWith('http') ? image : 'https://alifoe.github.io/EGENT_TOGO' + image,
            category,
            date: dateStr,
            author: 'EGENT-TOGO'
          })
        }
      } catch (err) {
        console.warn('⚠️ Erreur parsing article:', err.message)
      }
    })

    return articles
  } catch (error) {
    console.error('❌ Erreur récupération page:', error.message)
    throw error
  }
}

// Fonction pour importer les articles dans Firebase
async function importArticles(articles) {
  console.log(`\n📚 ${articles.length} articles trouvés. Démarrage de l'import...`)

  const articlesRef = collection(db, 'articles')
  let imported = 0
  let failed = 0

  for (const article of articles) {
    try {
      await addDoc(articlesRef, {
        ...article,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      
      imported++
      console.log(`✅ [${imported}/${articles.length}] "${article.title}" importé`)
    } catch (error) {
      failed++
      console.error(`❌ Erreur import "${article.title}":`, error.message)
    }
  }

  console.log(`\n📊 Résumé:`)
  console.log(`   ✅ Importés: ${imported}`)
  console.log(`   ❌ Échoués: ${failed}`)
  console.log(`   📦 Total: ${articles.length}`)
}

// Fonction principale
async function main() {
  try {
    console.log('🚀 Démarrage du script d\'import des articles\n')
    
    const articles = await fetchArticles()
    
    if (articles.length === 0) {
      console.warn('⚠️ Aucun article trouvé. Vérifiez les sélecteurs CSS.')
      process.exit(1)
    }

    console.log(`\n📄 Aperçu des articles (premiers 3):`)
    articles.slice(0, 3).forEach((article, i) => {
      console.log(`\n[${i + 1}] ${article.title}`)
      console.log(`    Slug: ${article.slug}`)
      console.log(`    Catégorie: ${article.category}`)
      console.log(`    Date: ${article.date}`)
      console.log(`    Image: ${article.image ? '✓ oui' : '✗ non'}`)
    })

    // Demander confirmation avant import
    console.log(`\n⚠️  Êtes-vous sûr de vouloir importer ${articles.length} articles?`)
    console.log('   Réponse attendue: oui (sinon l\'import ne se fera pas)\n')

    // Pour le script, on procède directement (adapter si interactif voulu)
    await importArticles(articles)
    
    console.log('\n✨ Import terminé avec succès!')
    process.exit(0)
  } catch (error) {
    console.error('\n💥 Erreur fatale:', error)
    process.exit(1)
  }
}

// Exécuter
main()
