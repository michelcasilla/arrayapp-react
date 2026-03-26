import { memo } from 'react'
import type { Node, NodeProps } from '@xyflow/react'
import { Handle, Position } from '@xyflow/react'
import { FLOW_NODE_SUMMARY } from '../data/planOptions'

export type PiggyBankNodeData = {
  title?: string
  dateRange?: string
}

type PiggyBankNodeType = Node<PiggyBankNodeData, 'piggyBank'>

export const PiggyBankNode = memo(({ data }: NodeProps<PiggyBankNodeType>) => {
  const title = data?.title ?? FLOW_NODE_SUMMARY.title
  const dateRange = data?.dateRange ?? FLOW_NODE_SUMMARY.dateRange

  return (
    <div className="min-w-[300px] max-w-[340px] rounded-2xl border border-white/60 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(42,16,126,0.10)]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        style={{ opacity: 0, width: 8, height: 8, background: 'transparent', border: 'none' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        style={{ opacity: 0, width: 8, height: 8, background: 'transparent', border: 'none' }}
      />
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white">
          <img
            src="/assets/icon-home.svg"
            alt=""
            draggable={false}
            className="h-14 w-14 select-none"
            style={{ display: 'block' }}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-[#2A107E]">{title}</p>
          <p className="text-sm italic text-[#795ADF]">{dateRange}</p>
        </div>
      </div>
    </div>
  )
})

PiggyBankNode.displayName = 'PiggyBankNode'

