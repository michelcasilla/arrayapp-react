import { Handle, Position } from '@xyflow/react'

import { hiddenHandleStyle } from '../nodeStyles'

const EXPERT_PORTRAIT_URLS = [
  'https://i.pravatar.cc/188?img=12',
  'https://i.pravatar.cc/188?img=33',
  'https://i.pravatar.cc/188?img=47',
  'https://i.pravatar.cc/188?img=59',
] as const

export const ExpertsNode = () => {
  return (
    <div className="w-[350px]">
      <Handle type="target" position={Position.Top} isConnectable={false} style={hiddenHandleStyle} />
      <div className="flex justify-center">
        {EXPERT_PORTRAIT_URLS.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            width={54}
            height={54}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`h-[54px] w-[54px] rounded-full object-cover shadow-[0_4px_14px_rgba(42,16,126,0.18)] ring-2 ring-white/90 ${idx > 0 ? '-ml-4' : ''}`}
            draggable={false}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-[18px] leading-tight text-[#2A107E]">Our Experts are at work...</p>
    </div>
  )
}
