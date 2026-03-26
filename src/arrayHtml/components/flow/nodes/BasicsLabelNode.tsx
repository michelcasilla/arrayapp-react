import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'

export const BasicsLabelNode = () => {
  return (
    <div className="rounded-full border-[2.5px] border-[#6952B8] bg-white/95 px-6 py-1.5 text-[20px] font-semibold text-[#2A107E] shadow-sm">
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <Handle type="source" position={Position.Bottom} isConnectable={false} style={hiddenHandleStyle} />
      The Basics (5)
    </div>
  )
}
