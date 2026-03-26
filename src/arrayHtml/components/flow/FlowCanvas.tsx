import { useEffect, useMemo } from 'react'
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { PLAN_OPTION_CARDS } from '../../data/planOptions'
import type { Stage } from '../../types'
import { FlowLogInButton } from './FlowLogInButton'
import { flowNodeTypes } from './flowNodeTypes'
import { GrabHand } from './GrabHand'
import { LoadingOverlay } from './LoadingOverlay'
import { PlanScreen } from './PlanScreen'
import { FitViewOnGraphChange } from './FitViewOnGraphChange'
import { useFlowGraph } from './useFlowGraph'

type Props = {
  stage: Stage
  selectedId: string
  onDropCard: (cardId: string) => void
  onKeepWorking: () => void
  onPerfect: () => void
  onShowPlan: () => void
}

export const FlowCanvas = ({ stage, selectedId, onDropCard, onKeepWorking, onPerfect, onShowPlan }: Props) => {
  const selectedCard = useMemo(
    () => PLAN_OPTION_CARDS.find((c) => c.id === selectedId) ?? PLAN_OPTION_CARDS[1],
    [selectedId],
  )
  const sideCards = useMemo(() => PLAN_OPTION_CARDS.filter((c) => c.id !== selectedCard.id), [selectedCard.id])

  const graph = useFlowGraph({
    stage,
    selectedCard,
    sideCards,
    onKeepWorking,
    onPerfect,
    onShowPlan,
  })

  const graphSignature = useMemo(
    () => `${stage}:${graph.nodes.map((n) => n.id).sort().join(',')}`,
    [graph.nodes, stage],
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges)

  useEffect(() => {
    setNodes(graph.nodes)
    setEdges(graph.edges)
  }, [graph.edges, graph.nodes, setEdges, setNodes])

  const showLoading = stage === 'loading'
  const showHand = stage !== 'define' && !showLoading

  const handleDrop: React.DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault()
    if (stage !== 'define') return
    const cardId = event.dataTransfer.getData('application/x-array-card') || event.dataTransfer.getData('text/plain')
    if (cardId) onDropCard(cardId)
  }

  const handleDragOver: React.DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  if (stage === 'the-plan') {
    return (
      <main className="array-flow-wrap relative flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#EADFFF]">
        <FlowLogInButton />
        <div className="min-h-0 flex-1 overflow-hidden">
          <PlanScreen />
        </div>
      </main>
    )
  }

  return (
    <main
      className="array-flow-wrap relative flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#EADFFF]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <FlowLogInButton />

      {showHand ? <GrabHand /> : null}

      <div className="relative min-h-0 flex-1">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={flowNodeTypes}
            fitView={false}
            panOnDrag={true}
            zoomOnScroll={false}
            zoomOnPinch={true}
            panOnScroll
            panOnScrollSpeed={0.85}
            selectionOnDrag={false}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            proOptions={{ hideAttribution: true }}
            minZoom={0.28}
            maxZoom={1.8}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            defaultEdgeOptions={{ type: 'smoothstep', style: { stroke: '#8D72D8', strokeWidth: 2.5 } }}
          >
            <FitViewOnGraphChange graphSignature={graphSignature} />
            <Background id="array-dots" variant={BackgroundVariant.Dots} gap={18} size={1.5} color="#795ADF" />
            <MiniMap
              position="bottom-left"
              maskStrokeWidth={2}
              className="!m-4 overflow-hidden rounded-lg border border-purple-200/80 bg-white/50 shadow-md !w-[120px] !h-[88px]"
              pannable={false}
              zoomable={false}
            />
            <Controls
              position="bottom-right"
              className="!m-4 overflow-hidden rounded-lg border border-purple-200/80 !shadow-md"
              showInteractive={false}
            />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {showLoading ? <LoadingOverlay /> : null}
    </main>
  )
}
