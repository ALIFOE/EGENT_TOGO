<template>
  <div class="import-container">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Import de Données</h1>
      <p class="text-gray-600 mb-8">
        Importe les produits, articles et projets existants dans Firebase
      </p>

      <!-- Status Message -->
      <div v-if="importStatus.message" class="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <p class="text-blue-800">{{ importStatus.message }}</p>
      </div>

      <!-- Error Message -->
      <div v-if="importStatus.error" class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
        <p class="text-red-800">{{ importStatus.error }}</p>
      </div>

      <!-- Progress Bar -->
      <div v-if="importStatus.isImporting" class="mb-6">
        <div class="flex justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Progression</span>
          <span class="text-sm font-medium text-gray-700">{{ importStatus.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            class="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
            :style="{ width: importStatus.progress + '%' }"
          ></div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div class="text-gray-600 text-sm font-medium mb-2">Produits</div>
          <div class="text-3xl font-bold text-blue-600">{{ importStatus.stats.productsImported }}</div>
          <div class="text-xs text-gray-500 mt-2">importés</div>
        </div>

        <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div class="text-gray-600 text-sm font-medium mb-2">Articles</div>
          <div class="text-3xl font-bold text-green-600">{{ importStatus.stats.articlesImported }}</div>
          <div class="text-xs text-gray-500 mt-2">importés</div>
        </div>

        <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div class="text-gray-600 text-sm font-medium mb-2">Projets</div>
          <div class="text-3xl font-bold text-purple-600">{{ importStatus.stats.projectsImported }}</div>
          <div class="text-xs text-gray-500 mt-2">importés</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4">
        <button
          @click="importAllData"
          :disabled="importStatus.isImporting"
          class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          <span v-if="!importStatus.isImporting">🚀 Importer Tout</span>
          <span v-else>⏳ Import en cours...</span>
        </button>

        <button
          @click="importProducts"
          :disabled="importStatus.isImporting"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          📦 Produits
        </button>

        <button
          @click="importArticles"
          :disabled="importStatus.isImporting"
          class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          📰 Articles
        </button>

        <button
          @click="importProjects"
          :disabled="importStatus.isImporting"
          class="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          🏗️ Projets
        </button>
      </div>

      <!-- Info Box -->
      <div class="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded">
        <h3 class="font-bold text-amber-900 mb-2">⚠️ Important</h3>
        <ul class="text-sm text-amber-800 space-y-1">
          <li>✓ Assurez-vous que les règles de sécurité Firebase sont en mode TEST</li>
          <li>✓ Vérifiez votre connexion à Firebase dans la console</li>
          <li>✓ L'import peut prendre quelques secondes</li>
          <li>✓ Les données existantes NE seront PAS supprimées</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataImport } from '../composables/useDataImport'

const { importStatus, importProducts, importArticles, importProjects, importAllData } = useDataImport()
</script>

<style scoped>
.import-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
}

.import-container > div {
  max-width: 900px;
  margin: 0 auto;
}
</style>
