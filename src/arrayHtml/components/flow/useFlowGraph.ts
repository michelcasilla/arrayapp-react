import { useMemo } from 'react'
import type { Edge, Node } from '@xyflow/react'

import type { PlanOptionCard } from '../../data/planOptions'
import type { Stage } from '../../types'
import {
  createBasicsPanelEdge,
  createBasicsPanelNode,
  createGoalRootNode,
  createKeyPiecesLoadingEdges,
  createKeyPiecesLoadingNodes,
  createKeyPiecesPanelEdges,
  createKeyPiecesPanelNodes,
  createTreeStackEdges,
  createTreeStackNodes,
} from './flowGraphBuilders'
import { flowLayout } from './flowLayout'

type Params = {
  stage: Stage
  selectedCard: PlanOptionCard
  sideCards: PlanOptionCard[]
  onKeepWorking: () => void
  onPerfect: () => void
  onShowPlan: () => void
}

export const useFlowGraph = ({
  stage,
  selectedCard,
  sideCards,
  onKeepWorking,
  onPerfect,
  onShowPlan,
}: Params) => {
  const showTree = stage !== 'define'
  const showConfirmPanel = stage === 'confirm'
  const showKeyPiecesLoading = stage === 'key-pieces-loading'
  const showKeyPiecesPanel = stage === 'key-pieces'

  return useMemo(() => {
    const layout = flowLayout
    const nodes: Node[] = [createGoalRootNode(layout)]
    const edges: Edge[] = []

    if (!showTree) return { nodes, edges }

    nodes.push(...createTreeStackNodes(layout, { selectedCard, sideCards }))
    edges.push(...createTreeStackEdges())

    if (showConfirmPanel) {
      nodes.push(createBasicsPanelNode(layout, { onKeepWorking, onPerfect }))
      edges.push(createBasicsPanelEdge())
    }

    if (showKeyPiecesLoading) {
      nodes.push(...createKeyPiecesLoadingNodes(layout))
      edges.push(...createKeyPiecesLoadingEdges())
    }

    if (showKeyPiecesPanel) {
      nodes.push(...createKeyPiecesPanelNodes(layout, { onKeepWorking, onShowPlan }))
      edges.push(...createKeyPiecesPanelEdges())
    }

    return { nodes, edges }
  }, [onKeepWorking, onPerfect, onShowPlan, selectedCard, showConfirmPanel, showKeyPiecesLoading, showKeyPiecesPanel, showTree, sideCards])
}
