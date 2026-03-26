import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'
import type { PanelNodeData } from '../types'

export const BasicsPanelNode = ({ data }: { data?: PanelNodeData }) => {
  const points = [
    'Dedicate 10–15 focused hours each week to the screenprinting business',
    'Focus on local custom clients as the first primary customer type',
    'Print in-house using lean, entry-level screenprinting gear',
    'Use Etsy plus social media as the main initial sales channels',
    'Print primarily on-demand instead of holding pre-printed inventory',
  ]
  return (
    <div className="w-[560px] rounded-3xl border-[3px] border-[#6952B8] bg-white/90 p-5 shadow-md">
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <h3 className="text-[22px] font-bold text-[#2A107E]">The Basics (5)</h3>
      <ul className="mt-3 space-y-1.5 text-[12px] text-[#2A107E]/90">
        {points.map((p) => (
          <li key={p}>
            <span className="mr-2 text-[#795ADF]">●</span>
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={data?.onPerfect}
          className="rounded-full bg-[#21C9A2] px-6 py-2 text-[16px] font-semibold text-white"
        >
          Yes, this is perfect!
        </button>
        <button
          type="button"
          onClick={data?.onKeepWorking}
          className="rounded-full border-2 border-[#B9A7E9] px-6 py-2 text-[16px] font-semibold text-[#6B58B8]"
        >
          Let’s keep working on these
        </button>
      </div>
    </div>
  )
}
