import { baseParse } from '@vue/compiler-dom'

export interface TreeNode {
  tag: string
  type: string
  children?: TreeNode[]
}

export function parseTemplate(template: string): TreeNode[] {
  const ast = baseParse(template, {
    decodeEntities: (rawText) => rawText
  })

  function walk(node: any): TreeNode[] {
    if (!node.children) return []

    return node.children
      .filter((child: any) => child.type === 1)
      .map((child: any) => {
        const tag = child.tag || 'unknown'

        return {
          tag: child.tag,
          type: child.tagType === 1 ? 'HTML' : 'COMPONENT',
          children: walk(child),
        }
      })
  }

  return walk(ast)
}
