import { html } from "https://esm.sh/htm@3.1.1/react?deps=react@18.3.1";

const TEAL = "#1DB689";
const LINE_PURPLE = "#B9A3E8";

/**
 * @param {object} props
 * @param {string[]} props.steps
 * @param {{activeIndex:number, completed:number[]}} props.state
 */
export function ProgressSteps({ steps, state }) {
  const colCount = steps.length;
  const activeIndex = state?.activeIndex ?? 0;
  const completed = state?.completed ?? [];

  /** Horizontal center of step i as % of row (0..100). */
  function stepCenterPct(i) {
    return ((i + 0.5) / colCount) * 100;
  }

  const firstCenter = stepCenterPct(0);
  const greenEndCenter = stepCenterPct(activeIndex);
  const greenWidthPct = Math.max(0, greenEndCenter - firstCenter);

  function DoneIcon() {
    return html`
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm"
        style=${{ backgroundColor: TEAL }}
      >
        <img src="./assets/icon-check.svg" alt="" className="h-5 w-5" draggable=${false} />
      </div>
    `;
  }

  return html`
    <div className="w-full">
      <div className="relative isolate">
        <div
          className="pointer-events-none absolute top-5 z-0 h-[2px] -translate-y-1/2"
          style=${{
            left: `${firstCenter}%`,
            right: `${firstCenter}%`,
            backgroundColor: LINE_PURPLE,
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-5 z-0 h-[2px] -translate-y-1/2"
          style=${{
            left: `${firstCenter}%`,
            width: `${greenWidthPct}%`,
            backgroundColor: TEAL,
          }}
          aria-hidden="true"
        />
        <div
          className="relative z-10 grid justify-items-center"
          style=${{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          role="list"
        >
          ${steps.map((label, i) => {
            const active = i === activeIndex;
            const done = completed.includes(i);
            const circle = active
              ? html`
                  <div
                    className="relative z-10 box-border flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#9376D4] bg-[#2A107E] shadow-sm"
                    role="listitem"
                    aria-current="step"
                    aria-label=${label}
                  >
                    <img
                      src="./assets/logo-dots.svg"
                      alt=""
                      draggable=${false}
                      className="h-[22px] w-[22px] select-none"
                      style=${{ display: "block" }}
                    />
                  </div>
                `
              : done
                ? html`<${DoneIcon} />`
                : html`
                    <div
                      className="relative z-10 h-10 w-10 shrink-0 rounded-full border-2 border-[#9376D4] bg-[#EADFFF]"
                      role="listitem"
                      aria-hidden="true"
                    />
                  `;
            return html`<div key=${label} className="flex w-full justify-center">${circle}</div>`;
          })}
        </div>
      </div>
      <div
        className="mt-3 grid text-[11px] font-bold leading-tight text-[#2A107E]"
        style=${{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        ${steps.map(
          (label) => html`
            <div className="min-w-0 text-center" key=${`step-${label}`}>
              ${label}
            </div>
          `,
        )}
      </div>
    </div>
  `;
}
