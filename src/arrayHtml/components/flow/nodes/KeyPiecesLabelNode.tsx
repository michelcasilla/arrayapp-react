import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'

export const KeyPiecesLabelNode = () => {
  return (
    <div className="rounded-full border-[2.5px] border-[#6952B8] bg-white/95 px-6 py-1.5 text-[20px] leading-none text-[#2A107E] shadow-sm">
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <Handle type="source" position={Position.Bottom} isConnectable={false} style={hiddenHandleStyle} />
      <span className="inline-flex items-end gap-1">
        <span className="animate-pulse">Filling in the key pieces</span>
        <span className="inline-block animate-bounce" style={{ animationDelay: '0ms' }}>
          .
        </span>
        <span className="inline-block animate-bounce" style={{ animationDelay: '180ms' }}>
          .
        </span>
        <span className="inline-block animate-bounce" style={{ animationDelay: '360ms' }}>
          .
        </span>
      </span>
    </div>
  )
}
