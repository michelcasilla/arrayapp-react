import { html } from "https://esm.sh/htm@3.1.1/react?deps=react@18.3.1";

/** Same teal + asset as ProgressSteps done state */
const STEP_TEAL = "#1DB689";

function SelectionIcon({ selected }) {
  if (selected) {
    return html`
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm"
        style=${{ backgroundColor: STEP_TEAL }}
        aria-hidden="true"
      >
        <img
          src="./assets/icon-check.svg"
          alt=""
          className="h-[18px] w-[18px] select-none"
          draggable=${false}
        />
      </div>
    `;
  }
  return html`
    <div
      className="mt-0.5 h-8 w-8 shrink-0 rounded-full border-2 border-dashed border-[#B39DDB]"
      aria-hidden="true"
    />
  `;
}

function Bullet({ dotClass, label, children }) {
  return html`
    <p className="text-[12px] leading-snug text-slate-700">
      <span
        className=${`mr-1.5 inline-block h-2 w-2 rounded-full align-middle ${dotClass}`}
      />
      <span className="font-semibold text-slate-800">${label}</span>
      ${" "}
      <span>${children}</span>
    </p>
  `;
}

/**
 * Reusable plan option card — use across wizard steps.
 *
 * @param {object} props
 * @param {boolean} props.selected
 * @param {() => void} [props.onClick]
 * @param {string} props.mainText
 * @param {string} props.success
 * @param {string} props.constraint
 * @param {string} props.tradeoff
 */
export function OptionCard({
  selected,
  onClick,
  draggable = false,
  onDragStart,
  mainText,
  success,
  constraint,
  tradeoff,
}) {
  const frame = selected
    ? `border-2 shadow-md`
    : "border-2 border-transparent shadow-sm hover:shadow";

  return html`
    <button
      type="button"
      onClick=${onClick}
      draggable=${draggable}
      onDragStart=${onDragStart}
      className=${`box-border flex w-full gap-3 rounded-2xl bg-white px-5 py-4 text-left transition ${frame} ${draggable ? "cursor-grab active:cursor-grabbing" : ""}`}
      style=${selected ? { borderColor: STEP_TEAL } : undefined}
    >
      <${SelectionIcon} selected=${selected} />
      <div className="min-w-0 flex-1 space-y-2.5">
        <p className="text-[14px] font-medium leading-snug text-slate-800">
          ${mainText}
        </p>
        <div className="space-y-1.5">
          <${Bullet} dotClass="bg-[#1DB689]" label="Success:"
            >${success}</${Bullet}>
          <${Bullet} dotClass="bg-[#FF625A]" label="Constraint:"
            >${constraint}</${Bullet}>
          <${Bullet} dotClass="bg-[#02BACE]" label="Tradeoff:"
            >${tradeoff}</${Bullet}>
        </div>
      </div>
    </button>
  `;
}
