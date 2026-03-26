import type { PlanOptionCard } from '../../data/planOptions'

export type TreeCardNodeData = { card: PlanOptionCard; faded?: boolean }

export type PanelNodeData = { onShowPlan?: () => void; onKeepWorking?: () => void; onPerfect?: () => void }
