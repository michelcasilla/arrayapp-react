import type { ProgressState } from '../types'

const TEAL = '#1DB689'
const LINE_PURPLE = '#B9A3E8'

type Props = {
  steps: string[]
  state: ProgressState
}

const stepCenterPct = (i: number, colCount: number) => ((i + 0.5) / colCount) * 100

const DoneIcon = () => {
  return (
    <div
      className="animate-array-step-pop flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm"
      style={{ backgroundColor: TEAL }}
    >
      <img src="/assets/icon-check.svg" alt="" className="h-5 w-5" draggable={false} />
    </div>
  )
}

export const ProgressSteps = ({ steps, state }: Props) => {
  const colCount = steps.length
  const activeIndex = state?.activeIndex ?? 0
  const completed = state?.completed ?? []

  const firstCenter = stepCenterPct(0, colCount)
  const greenEndCenter = stepCenterPct(activeIndex, colCount)
  const greenWidthPct = Math.max(0, greenEndCenter - firstCenter)

  return (
    <div className="w-full">
      <div className="relative isolate">
        <div
          className="pointer-events-none absolute top-5 z-0 h-[2px] -translate-y-1/2"
          style={{ left: `${firstCenter}%`, right: `${firstCenter}%`, backgroundColor: LINE_PURPLE }}
          aria-hidden="true"
        />
        <div
          className="transition-progress-line pointer-events-none absolute top-5 z-0 h-[2px] -translate-y-1/2"
          style={{ left: `${firstCenter}%`, width: `${greenWidthPct}%`, backgroundColor: TEAL }}
          aria-hidden="true"
        />
        <div
          className="relative z-10 grid justify-items-center"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          role="list"
        >
          {steps.map((label, i) => {
            const active = i === activeIndex
            const done = completed.includes(i)
            const circle = active ? (
              <div
                key={`active-${activeIndex}-${i}`}
                className="animate-array-step-active relative z-10 box-border flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#9376D4] bg-[#2A107E] shadow-md"
                role="listitem"
                aria-current="step"
                aria-label={label}
              >
                <img
                  src="/assets/logo-dots.svg"
                  alt=""
                  draggable={false}
                  className="h-[32px] w-[32px] select-none"
                  style={{ display: 'block' }}
                />
              </div>
            ) : done ? (
              <div key={`done-${i}`} className="flex justify-center">
                <DoneIcon />
              </div>
            ) : (
              <div
                className="relative z-10 h-10 w-10 shrink-0 rounded-full border-2 border-[#9376D4] bg-[#EADFFF] transition-colors duration-300"
                role="listitem"
                aria-hidden="true"
              />
            )
            return (
              <div key={label} className="flex w-full justify-center">
                {circle}
              </div>
            )
          })}
        </div>
      </div>
      <div
        className="mt-3 grid text-[11px] font-bold leading-tight text-[#2A107E]"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {steps.map((label, i) => (
          <div
            className={`min-w-0 text-center transition-all duration-300 ease-out ${
              i === activeIndex ? 'font-bold text-[#2A107E]' : 'font-normal text-[#2A107E]/75'
            }`}
            key={`step-${label}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

