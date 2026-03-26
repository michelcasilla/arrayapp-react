import { ArrayLogo } from './ArrayLogo'
import { OptionCard } from './OptionCard'
import { ProgressSteps } from './ProgressSteps'
import { PLAN_OPTION_CARDS, PLAN_PAGE, PROGRESS_STEPS } from '../data/planOptions'
import type { ProgressState, Stage } from '../types'

type Props = {
  stage: Stage
  selectedId: string
  onSelectCard: (id: string) => void
  onCardDragStart: (event: React.DragEvent<HTMLButtonElement>, cardId: string) => void
  clarifyMessage: string
  onClarifyMessageChange: (value: string) => void
  onClarifySend: () => void
  onConfirmSend: () => void
  progressState: ProgressState
}

type ClarifyComposerProps = {
  message: string
  onChange: (value: string) => void
  onSend: () => void
}

const ClarifyComposer = ({ message, onChange, onSend }: ClarifyComposerProps) => {
  return (
    <div className="rounded-2xl bg-white p-0.5 shadow-md ring-1 ring-[#DED1F8]">
      <textarea
        className="h-[120px] w-full resize-none rounded-t-2xl border-0 bg-transparent px-4 py-3 text-base text-slate-700 outline-none"
        value={message}
        onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
      />
      <div className="flex items-center justify-between rounded-b-2xl border-t border-[#ECE5FB] px-4 py-2.5">
        <img src="/assets/icon-upload-clip.svg" alt="" className="h-4 w-[17px] select-none" draggable={false} />
        <button
          type="button"
          onClick={onSend}
          className="btn-elevate flex h-9 w-9 items-center justify-center rounded-full bg-[#2A107E] text-white shadow-md"
        >
          <img src="/assets/icon-search-field-arrow.svg" alt="" className="h-[13px] w-[17px] select-none" draggable={false} />
        </button>
      </div>
    </div>
  )
}

type ConfirmComposerProps = {
  onSend: () => void
}

const ConfirmComposer = ({ onSend }: ConfirmComposerProps) => {
  return (
    <div className="rounded-2xl bg-white shadow-md ring-1 ring-[#DED1F8]">
      <div className="flex items-center gap-2 px-4 py-2.5">
        <input
          value="Talk to array..."
          disabled={true}
          className="w-full border-0 bg-transparent text-base text-slate-500 outline-none"
        />
        <button
          type="button"
          onClick={onSend}
          className="btn-elevate flex h-9 w-9 aspect-[1/1] items-center justify-center rounded-full bg-[#2A107E] text-white shadow-md "
        >
          <img src="/assets/icon-search-field-arrow.svg" alt="" className="h-[13px] w-[17px] select-none" draggable={false} />
        </button>
      </div>
    </div>
  )
}

export const Sidebar = ({
  stage,
  selectedId,
  onSelectCard,
  onCardDragStart,
  clarifyMessage,
  onClarifyMessageChange,
  onClarifySend,
  onConfirmSend,
  progressState,
}: Props) => {
  const isDefine = stage === 'define'
  const unifiedCopyClass = 'mt-2 text-[17px] font-semibold leading-tight text-[#2A107E]'
  const unifiedSubClass = 'mt-2 text-[17px] leading-tight text-[#2A107E]/85'

  const clarifyTitle1 =
    'Which primary customer type do you want to serve first: local custom clients or niche online buyers?'
  const clarifySub1 =
    'Recommendation: Local custom clients usually provide faster validation and repeat orders than targeting niche online buyers.'
  const clarifyTitle2 =
    'How many hours per week can you reliably dedicate to this screenprinting business alongside your main work?'
  const clarifySub2 =
    'Recommendation: A minimum of 10-15 focused hours weekly gives this business a realistic validation chance.'

  const confirmText = 'Great! We have established the basics to your Summer Plan. Let’s confirm these are correct.'
  const keyPiecesTitle = 'Thank you!'
  const keyPiecesSub = 'Our experts are building out the key pieces to solidify your plan.'
  const thePlanReady = "You're plan is ready!"
  const thePlanSub = 'Have changes? Let us know what you need.'
  const reviseText = '“Let’s keep working on these”. Please provide any additions or revisions to the basics.'

  return (
    <aside className="flex h-full w-[30%] min-w-[300px] max-w-xl flex-col border-r-2 border-[#D7C2FF] bg-[#EADFFF] px-6 py-8">
      <div className="flex min-h-0 flex-1 flex-col gap-7">
        <header className="shrink-0 space-y-4">
          <ArrayLogo size="md" />
          <div>
            <h1 className="text-[26px] font-bold leading-tight text-[#2A107E] md:text-[28px]">{PLAN_PAGE.title}</h1>
            {isDefine ? (
              <p className={unifiedSubClass}>{PLAN_PAGE.subtitle}</p>
            ) : stage === 'clarify-1' || stage === 'clarify-2' ? (
              <>
                <p className={unifiedCopyClass}>{stage === 'clarify-1' ? clarifyTitle1 : clarifyTitle2}</p>
                <p className={unifiedSubClass}>{stage === 'clarify-1' ? clarifySub1 : clarifySub2}</p>
              </>
            ) : stage === 'revise' ? (
              <p className={unifiedCopyClass}>{reviseText}</p>
            ) : stage === 'key-pieces' || stage === 'key-pieces-loading' ? (
              <>
                <p className={unifiedCopyClass}>{keyPiecesTitle}</p>
                <p className="mt-2 text-[17px] font-semibold leading-tight text-[#2A107E]">{keyPiecesSub}</p>
              </>
            ) : stage === 'the-plan' ? (
              <>
                <p className="mt-2 text-[17px] font-semibold leading-tight text-[#21C9A2]">{thePlanReady}</p>
                <p className="mt-2 text-[17px] font-semibold leading-tight text-[#2A107E]">{thePlanSub}</p>
              </>
            ) : (
              <p className={unifiedCopyClass}>{confirmText}</p>
            )}
          </div>
        </header>

        {isDefine ? (
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-0.5">
            {PLAN_OPTION_CARDS.map((card) => (
              <OptionCard
                key={card.id}
                selected={card.id === selectedId}
                onClick={() => onSelectCard(card.id)}
                draggable={true}
                onDragStart={(e) => onCardDragStart(e, card.id)}
                mainText={card.mainText}
                success={card.success}
                constraint={card.constraint}
                tradeoff={card.tradeoff}
              />
            ))}
          </div>
        ) : stage === 'clarify-1' || stage === 'clarify-2' || stage === 'revise' ? (
          <div className="min-h-0 flex-1 pt-2">
            <ClarifyComposer message={clarifyMessage} onChange={onClarifyMessageChange} onSend={onClarifySend} />
          </div>
        ) : stage === 'key-pieces' || stage === 'key-pieces-loading' || stage === 'the-plan' ? (
          <div className="min-h-0 flex-1 pt-2">
            <ConfirmComposer onSend={() => {}} />
          </div>
        ) : (
          <div className="min-h-0 flex-1 pt-2">
            <ConfirmComposer onSend={onConfirmSend} />
          </div>
        )}
      </div>

      <footer className="mt-8 shrink-0 pt-6">
        <ProgressSteps steps={PROGRESS_STEPS} state={progressState} />
      </footer>
    </aside>
  )
}

