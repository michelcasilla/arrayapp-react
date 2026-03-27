import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'

export const PuNode = () => {
  return (
    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#FF5EA8] shadow">
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <Handle type="source" position={Position.Bottom} isConnectable={false} style={hiddenHandleStyle} />
      <img src="/assets/icon-flag.svg" alt="" className="block h-[20px] w-[20px]" draggable={false} />
    </div>
  )
}
