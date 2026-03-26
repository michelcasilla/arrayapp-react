import { Position, type Edge, type Node } from '@xyflow/react'

import { FLOW_NODE_SUMMARY, type PlanOptionCard } from '../../data/planOptions'
import type { PanelNodeData } from './types'
import type { FlowLayout } from './flowLayout'

const FLOW_EDGE_STYLE = { stroke: '#8D72D8', strokeWidth: 2.5 } as const

export const createFlowEdge = (id: string, source: string, target: string): Edge => ({
  id,
  source,
  target,
  type: 'smoothstep',
  style: { ...FLOW_EDGE_STYLE },
})

export type TreeStackParams = {
  selectedCard: PlanOptionCard
  sideCards: PlanOptionCard[]
}

export const createGoalRootNode = (layout: FlowLayout): Node => {
  const { x: lx, y: ly } = layout
  return {
    id: 'goal-root',
    type: 'piggyBank',
    position: { x: lx.root, y: ly.root },
    data: { title: FLOW_NODE_SUMMARY.title, dateRange: FLOW_NODE_SUMMARY.dateRange },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    draggable: true,
  }
}

export const createTreeStackNodes = (layout: FlowLayout, { selectedCard, sideCards }: TreeStackParams): Node[] => {
  const { x: lx, y: ly } = layout
  const left = sideCards[0]
  const right = sideCards[1]
  return [
    {
      id: 'selected-card',
      type: 'treeCard',
      position: { x: lx.centerCard, y: ly.cards },
      data: { card: selectedCard, faded: false },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
    {
      id: 'left-card',
      type: 'treeCard',
      position: { x: lx.leftCard, y: ly.cards },
      data: { card: left, faded: true },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
    {
      id: 'right-card',
      type: 'treeCard',
      position: { x: lx.rightCard, y: ly.cards },
      data: { card: right, faded: true },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
    {
      id: 'pu',
      type: 'puNode',
      position: { x: lx.pu, y: ly.pu },
      data: {},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
    {
      id: 'basics-label',
      type: 'basicsLabel',
      position: { x: lx.basicsPill, y: ly.basicsPill },
      data: {},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
  ]
}

export const createTreeStackEdges = (): Edge[] => [
  createFlowEdge('e-root-left', 'goal-root', 'left-card'),
  createFlowEdge('e-root-selected', 'goal-root', 'selected-card'),
  createFlowEdge('e-root-right', 'goal-root', 'right-card'),
  createFlowEdge('e-selected-pu', 'selected-card', 'pu'),
  createFlowEdge('e-pu-basics', 'pu', 'basics-label'),
]

export type BasicsPanelParams = {
  onKeepWorking: () => void
  onPerfect: () => void
}

export const createBasicsPanelNode = (layout: FlowLayout, { onKeepWorking, onPerfect }: BasicsPanelParams): Node => {
  const { x: lx, y: ly } = layout
  const data: PanelNodeData = { onKeepWorking, onPerfect }
  return {
    id: 'basics-panel',
    type: 'basicsPanel',
    position: { x: lx.basicsPanel, y: ly.basicsPanel },
    data,
    draggable: true,
  }
}

export const createBasicsPanelEdge = (): Edge => createFlowEdge('e-label-panel', 'basics-label', 'basics-panel')

export const createKeyPiecesLoadingNodes = (layout: FlowLayout): Node[] => {
  const { x: lx, y: ly } = layout
  return [
    {
      id: 'key-piece-icon',
      type: 'keyPieceIcon',
      position: { x: lx.keyIcon, y: ly.keyIcon },
      data: {},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
    {
      id: 'key-pieces-label',
      type: 'keyPiecesLabel',
      position: { x: lx.keyLabel, y: ly.keyPiecesLabel },
      data: {},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
    {
      id: 'experts',
      type: 'expertsNode',
      position: { x: lx.experts, y: ly.experts },
      data: {},
      targetPosition: Position.Top,
      draggable: true,
    },
  ]
}

export const createKeyPiecesLoadingEdges = (): Edge[] => [
  createFlowEdge('e-basics-keyicon', 'basics-label', 'key-piece-icon'),
  createFlowEdge('e-keyicon-keylabel', 'key-piece-icon', 'key-pieces-label'),
  createFlowEdge('e-keylabel-experts', 'key-pieces-label', 'experts'),
]

export type KeyPiecesPanelParams = {
  onKeepWorking: () => void
  onShowPlan: () => void
}

export const createKeyPiecesPanelNodes = (layout: FlowLayout, { onKeepWorking, onShowPlan }: KeyPiecesPanelParams): Node[] => {
  const { x: lx, y: ly } = layout
  const data: PanelNodeData = { onKeepWorking, onShowPlan }
  return [
    {
      id: 'key-piece-icon',
      type: 'keyPieceIcon',
      position: { x: lx.keyIcon, y: ly.keyIcon },
      data: {},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      draggable: true,
    },
    {
      id: 'key-pieces-panel',
      type: 'keyPiecesPanel',
      position: { x: lx.keyPiecesPanel, y: ly.keyPiecesPanel },
      data,
      targetPosition: Position.Top,
      draggable: true,
    },
  ]
}

export const createKeyPiecesPanelEdges = (): Edge[] => [
  createFlowEdge('e-basics-keyicon-panel', 'basics-label', 'key-piece-icon'),
  createFlowEdge('e-keyicon-panel', 'key-piece-icon', 'key-pieces-panel'),
]
