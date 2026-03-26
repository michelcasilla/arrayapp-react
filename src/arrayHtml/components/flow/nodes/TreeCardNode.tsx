import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'
import type { TreeCardNodeData } from '../types'

export const TreeCardNode = ({ data }: { data: TreeCardNodeData }) => {
  const card = data.card
  const faded = !!data.faded
  return (
    <div
      className={`w-[270px] rounded-2xl border border-[#795ADF]/75 bg-white px-4 py-3 text-[#2A107E] shadow-sm transition ${
        faded ? 'opacity-35' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <Handle type="source" position={Position.Bottom} isConnectable={false} style={hiddenHandleStyle} />
      <p className="line-clamp-3 text-[14px] font-semibold leading-snug">{card.mainText}</p>
      <div className="mt-3 space-y-1 text-[12px]">
        <p className="truncate">
          <span className="text-[#52EE9B]">●</span> {card.success}
        </p>
        <p className="truncate">
          <span className="text-[#FF625A]">●</span> {card.constraint}
        </p>
        <p className="truncate">
          <span className="text-[#02BACE]">●</span> {card.tradeoff}
        </p>
      </div>
    </div>
  )
}
