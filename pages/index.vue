<script setup lang="ts">
import { ref } from 'vue'
import { parseTemplate, type TreeNode } from '~/utils/parseTemplate'
import TreeDiagram from '~/components/TreeDiagram.vue'

const inputCode = ref(``)

const tree = ref<TreeNode[]>([])
const showDiagram = ref(false)

function generateTree() {
  const templateRegex = /<template>([\s\S]*?)<\/template>/
  const match = templateRegex.exec(inputCode.value)
  const templateContent = match ? match[1].trim() : inputCode.value

  tree.value = parseTemplate(templateContent)
  showDiagram.value = true
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-2">
      Gerador de Mapa Vue
    </h1>

    <textarea 
      v-model="inputCode" 
      label="Código Vue"
      rows="10" 
      class="w-full border p-2 mb-4" 
    />
    <button 
      @click="generateTree" 
      class="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Gerar Mapa
    </button>

    <div 
      class="mt-6 h-[600px]" 
      v-if="showDiagram"
    >
      <TreeDiagram :data="tree" />
    </div>
  </div>
</template>
