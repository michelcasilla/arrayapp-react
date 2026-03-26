import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'

export const KeyPieceIconNode = () => {
  return (
    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#22C9BD] shadow">
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <Handle type="source" position={Position.Bottom} isConnectable={false} style={hiddenHandleStyle} />
      <img src="/assets/icon-key.svg" alt="" className="h-[26px] w-[26px]" draggable={false} />
    </div>
  )
}
