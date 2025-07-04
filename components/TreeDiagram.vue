<script setup lang="ts">
import { VueFlow, useVueFlow, Position } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'

import type { TreeNode } from '~/utils/parseTemplate'

const props = defineProps<{
  data: TreeNode[]
}>()

function generateFlowElements(nodes: TreeNode[]) {
  const elements: any[] = []
  let idCounter = 0

  function traverse(node: TreeNode, parentId: string | null, depth: number) {
    const nodeId = `node-${idCounter++}`

    elements.push({
      id: nodeId,
      type: 'default',
      data: {
        label: node.type === 'COMPONENT' ? `<${node.tag}>` : node.tag
      },
      position: { x: depth * 250, y: idCounter * 100 },
      style: {
        background: node.type === 'HTML' ? '#3b82f6' : '#ec4899',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        minWidth: '100px',
        textAlign: 'center',
      }
    })

    if (parentId) {
      elements.push({
        id: `e-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: 'default'
      })
    }

    node.children?.forEach(child => traverse(child, nodeId, depth + 1))
  }

  nodes.forEach(n => traverse(n, null, 0))

  return elements
}

const elements = generateFlowElements(props.data)
</script>

<template>
  <div class="h-[600px] w-full border">
    <VueFlow 
      :nodes="elements.filter(e => !e.source)" 
      :edges="elements.filter(e => e.source)" 
      fit-view 
    />
  </div>
</template>
