import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'
import type { PanelNodeData } from '../types'

export const KeyPiecesPanelNode = ({ data }: { data?: PanelNodeData }) => {
  const points = [
    'Validated Niche & Offer',
    'Lean Production Engine',
    'Customer Acquisition & Retention System',
    'Cashflow & Risk Management',
    'Brand & Process Assets',
  ]
  return (
    <div className="w-[560px] rounded-3xl border-[3px] border-[#6952B8] bg-white/90 px-6 py-5 shadow-md">
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <h3 className="text-[22px] font-bold leading-none text-[#2A107E]">Key Pieces</h3>
      <p className="mt-2 text-[14px] text-[#2A107E]/80">
        The major building blocks of your Plan with the guidance to move you forward.
      </p>
      <ul className="mt-4 space-y-1.5 text-[12px] text-[#2A107E]/90">
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
          onClick={data?.onShowPlan}
          className="btn-elevate rounded-full bg-[#21C9A2] px-6 py-2 text-[16px] font-semibold text-white shadow-md"
        >
          Show me the Plan!
        </button>
        <button
          type="button"
          onClick={data?.onKeepWorking}
          className="btn-elevate rounded-full border-2 border-[#B9A7E9] bg-white/90 px-6 py-2 text-[16px] font-semibold text-[#6B58B8] shadow-sm"
        >
          Let’s keep working on these
        </button>
      </div>
    </div>
  )
}
