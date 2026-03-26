import { useMemo } from 'react'
import { Position, type Edge, type Node } from '@xyflow/react'

import { FLOW_NODE_SUMMARY, type PlanOptionCard } from '../../data/planOptions'
import type { Stage } from '../../types'

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
    const nodes: Node[] = [
      {
        id: 'goal-root',
        type: 'piggyBank',
        position: { x: 520, y: 40 },
        data: { title: FLOW_NODE_SUMMARY.title, dateRange: FLOW_NODE_SUMMARY.dateRange },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
    ]
    const edges: Edge[] = []

    if (!showTree) return { nodes, edges }

    nodes.push(
      {
        id: 'selected-card',
        type: 'treeCard',
        position: { x: 530, y: 235 },
        data: { card: selectedCard, faded: false },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: 'left-card',
        type: 'treeCard',
        position: { x: 220, y: 235 },
        data: { card: sideCards[0], faded: true },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: 'right-card',
        type: 'treeCard',
        position: { x: 840, y: 235 },
        data: { card: sideCards[1], faded: true },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: 'pu',
        type: 'puNode',
        position: { x: 665, y: 475 },
        data: {},
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
      {
        id: 'basics-label',
        type: 'basicsLabel',
        position: { x: 615, y: 560 },
        data: {},
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        draggable: true,
      },
    )

    edges.push(
      { id: 'e-root-left', source: 'goal-root', target: 'left-card', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
      { id: 'e-root-selected', source: 'goal-root', target: 'selected-card', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
      { id: 'e-root-right', source: 'goal-root', target: 'right-card', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
      { id: 'e-selected-pu', source: 'selected-card', target: 'pu', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
      { id: 'e-pu-basics', source: 'pu', target: 'basics-label', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
    )

    if (showConfirmPanel) {
      nodes.push({ id: 'basics-panel', type: 'basicsPanel', position: { x: 460, y: 610 }, data: { onKeepWorking, onPerfect }, draggable: true })
      edges.push({ id: 'e-label-panel', source: 'basics-label', target: 'basics-panel', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } })
    }

    if (showKeyPiecesLoading) {
      nodes.push(
        { id: 'key-piece-icon', type: 'keyPieceIcon', position: { x: 665, y: 660 }, data: {}, sourcePosition: Position.Bottom, targetPosition: Position.Top, draggable: true },
        { id: 'key-pieces-label', type: 'keyPiecesLabel', position: { x: 540, y: 750 }, data: {}, sourcePosition: Position.Bottom, targetPosition: Position.Top, draggable: true },
        { id: 'experts', type: 'expertsNode', position: { x: 520, y: 845 }, data: {}, targetPosition: Position.Top, draggable: true },
      )
      edges.push(
        { id: 'e-basics-keyicon', source: 'basics-label', target: 'key-piece-icon', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
        { id: 'e-keyicon-keylabel', source: 'key-piece-icon', target: 'key-pieces-label', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
        { id: 'e-keylabel-experts', source: 'key-pieces-label', target: 'experts', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
      )
    }

    if (showKeyPiecesPanel) {
      nodes.push(
        { id: 'key-piece-icon', type: 'keyPieceIcon', position: { x: 665, y: 660 }, data: {}, sourcePosition: Position.Bottom, targetPosition: Position.Top, draggable: true },
        { id: 'key-pieces-panel', type: 'keyPiecesPanel', position: { x: 330, y: 730 }, data: { onKeepWorking, onShowPlan }, targetPosition: Position.Top, draggable: true },
      )
      edges.push(
        { id: 'e-basics-keyicon-panel', source: 'basics-label', target: 'key-piece-icon', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
        { id: 'e-keyicon-panel', source: 'key-piece-icon', target: 'key-pieces-panel', type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } },
      )
    }

    return { nodes, edges }
  }, [onKeepWorking, onPerfect, onShowPlan, selectedCard, showConfirmPanel, showKeyPiecesLoading, showKeyPiecesPanel, showTree, sideCards])
}
