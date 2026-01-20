<template>
  <div class="quill-editor-wrapper">
    <!-- Toolbar -->
    <div class="ql-toolbar ql-snow" :id="`toolbar-${uniqueId}`">
      <span class="ql-formats">
        <select class="ql-header">
          <option selected>Normal</option>
          <option value="1">Titre 1</option>
          <option value="2">Titre 2</option>
          <option value="3">Titre 3</option>
        </select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold" title="Gras">B</button>
        <button class="ql-italic" title="Italique">I</button>
        <button class="ql-underline" title="Souligné">U</button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered" title="Liste numérotée">1.</button>
        <button class="ql-list" value="bullet" title="Liste à puces">•</button>
      </span>
      <span class="ql-formats">
        <button class="ql-link" title="Lien">🔗</button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean" title="Nettoyer le format">✕</button>
      </span>
    </div>

    <!-- Editor -->
    <div 
      :id="`editor-${uniqueId}`"
      class="ql-editor"
      style="min-height: 300px; background: white; border: 1px solid #ccc; border-radius: 0.5rem; padding: 1rem;"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const uniqueId = ref(`quill-${Math.random().toString(36).substr(2, 9)}`)
let quill = null

onMounted(() => {
  const editorId = `editor-${uniqueId.value}`
  const toolbarId = `toolbar-${uniqueId.value}`

  quill = new Quill(`#${editorId}`, {
    theme: 'snow',
    modules: {
      toolbar: `#${toolbarId}`
    },
    placeholder: 'Écrivez votre contenu ici...'
  })

  // Initialiser avec la valeur prop
  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue
  }

  // Émettre les changements
  quill.on('text-change', () => {
    emit('update:modelValue', quill.root.innerHTML)
  })
})

// Mettre à jour si la prop change
watch(() => props.modelValue, (newValue) => {
  if (quill && quill.root.innerHTML !== newValue) {
    quill.root.innerHTML = newValue
  }
})
</script>

<style scoped>
.quill-editor-wrapper :deep(.ql-toolbar) {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  background: #f8f9fa;
}

.quill-editor-wrapper :deep(.ql-container) {
  border: none;
}

.quill-editor-wrapper :deep(.ql-editor) {
  font-size: 1rem;
  line-height: 1.6;
  min-height: 300px;
}

.quill-editor-wrapper :deep(.ql-editor.ql-blank::before) {
  color: #999;
  font-style: italic;
}

.quill-editor-wrapper :deep(.ql-toolbar.ql-snow .ql-formats) {
  margin-right: 0.5rem;
}

.quill-editor-wrapper :deep(.ql-toolbar.ql-snow button:hover),
.quill-editor-wrapper :deep(.ql-toolbar.ql-snow select:hover) {
  background: #e0e0e0;
}

.quill-editor-wrapper :deep(.ql-toolbar.ql-snow button.ql-active) {
  background: #0392C7;
  color: white;
}
</style>
