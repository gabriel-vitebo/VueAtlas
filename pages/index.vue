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
  <div class="p-4 bg-gray-900 w-full max-w-7xl mx-auto">
    <h1 class="text-xl font-bold mb-2 text-violet-200">
      Gerador de Mapa Vue
    </h1>

    <UTextarea 
      v-model="inputCode"
      :rows="12"
      color="neutral"
      placeholder="Cole o código Vue aqui..."
      class="text-white "
    />

    <UButton 
      label="Gerar Mapa" 
      @click="generateTree"
      color="secondary" 
      variant="soft"
    />

    <div 
      class="mt-6 h-[600px]" 
      v-if="showDiagram"
    >
      <TreeDiagram :data="tree" />
    </div>
  </div>
</template>
