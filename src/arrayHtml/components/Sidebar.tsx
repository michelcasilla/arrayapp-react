import { ArrayLogo } from './ArrayLogo'
import { OptionCard } from './OptionCard'
import { ProgressSteps } from './ProgressSteps'
import { PromptComposer } from './PromptComposer'
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
  uploadedDocument: File | null
  onDocumentSelect: (file: File | null) => void
  progressState: ProgressState
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
  uploadedDocument,
  onDocumentSelect,
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
    <aside className="flex h-full min-h-0 w-full min-w-0 flex-col bg-[#EADFFF] px-6 py-8">
      <div className="flex min-h-0 flex-1 flex-col gap-7">
        <header className="shrink-0 space-y-4">
          <ArrayLogo size="md" />
          <div>
            <h1 className="font-['Inter',sans-serif] text-[45px] font-semibold leading-[1] tracking-[0.015em] text-[#2A107E]">
              {PLAN_PAGE.title}
            </h1>
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
                <p className="mt-2 font-['Inter',sans-serif] text-[18px] font-bold leading-[1.46] tracking-[0.005em] text-[#1DBB91]">
                  {thePlanReady}
                </p>
                <p className="mt-2 font-['Inter',sans-serif] text-[18px] font-bold leading-[1.46] tracking-[0.005em] text-[#2A107E]">
                  {thePlanSub}
                </p>
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
            <PromptComposer
              variant="full"
              value={clarifyMessage}
              onChange={onClarifyMessageChange}
              onSend={onClarifySend}
              allowDocuments={true}
              uploadedDocument={uploadedDocument}
              onDocumentSelect={onDocumentSelect}
            />
          </div>
        ) : stage === 'key-pieces' || stage === 'key-pieces-loading' || stage === 'the-plan' ? (
          <div className="min-h-0 flex-1 pt-2">
            <PromptComposer
              variant="compact"
              value={clarifyMessage}
              placeholder="Talk to array..."
              onChange={onClarifyMessageChange}
              onSend={() => {}}
            />
          </div>
        ) : (
          <div className="min-h-0 flex-1 pt-2">
            <PromptComposer
              variant="compact"
              value={clarifyMessage}
              placeholder="Talk to array..."
              onChange={onClarifyMessageChange}
              onSend={onConfirmSend}
            />
          </div>
        )}
      </div>

      <footer className="mt-8 shrink-0 pt-6">
        <ProgressSteps steps={PROGRESS_STEPS} state={progressState} />
      </footer>
    </aside>
  )
}

