import { useEffect, useMemo, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { FlowCanvas } from './components/FlowCanvas'
import { PLAN_OPTION_CARDS } from './data/planOptions'
import type { ProgressState, Stage } from './types'

export const ArrayHtmlApp = () => {
  const [selectedId, setSelectedId] = useState(PLAN_OPTION_CARDS[1].id)
  const [stage, setStage] = useState<Stage>('define')
  const [clarifyMessage, setClarifyMessage] = useState("Sure i'll try the local approach")

  const progressState: ProgressState = useMemo(() => {
    if (stage === 'define') return { activeIndex: 0, completed: [] }
    if (stage === 'the-plan') return { activeIndex: 4, completed: [0, 1, 2, 3] }
    if (stage === 'key-pieces-loading' || stage === 'key-pieces') return { activeIndex: 3, completed: [0, 1, 2] }
    if (stage === 'confirm' || stage === 'confirm-intro' || stage === 'loading' || stage === 'revise')
      return { activeIndex: 2, completed: [0, 1] }
    return { activeIndex: 1, completed: [0] }
  }, [stage])

  useEffect(() => {
    if (stage !== 'loading') return undefined
    const timer = window.setTimeout(() => setStage('confirm-intro'), 1500)
    return () => window.clearTimeout(timer)
  }, [stage])

  useEffect(() => {
    if (stage !== 'key-pieces-loading') return undefined
    const timer = window.setTimeout(() => setStage('key-pieces'), 5000)
    return () => window.clearTimeout(timer)
  }, [stage])

  const handleCardDrop = (cardId: string) => {
    setSelectedId(cardId)
    setStage('clarify-1')
    setClarifyMessage("Sure i'll try the local approach")
  }

  const handleCardDragStart = (event: React.DragEvent<HTMLButtonElement>, cardId: string) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', cardId)
    event.dataTransfer.setData('application/x-array-card', cardId)
  }

  const handleClarifySend = () => {
    if (stage === 'clarify-1') {
      setStage('clarify-2')
      setClarifyMessage('yes i can do that')
      return
    }
    if (stage === 'clarify-2') {
      setStage('loading')
      return
    }
    if (stage === 'revise') setStage('confirm')
  }

  const handleConfirmSend = () => setStage('confirm')

  const handleKeepWorking = () => {
    setStage('revise')
    setClarifyMessage(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum vel leo gravida, eu sollicitudin enim accumsan. Etiam vestibulum, quam id euismod vulputate, sapien ex blandit leo.',
    )
  }

  const handlePerfect = () => setStage('key-pieces-loading')
  const handleShowPlan = () => setStage('the-plan')

  const handleBackToWorkspace = () => {
    setStage('define')
    setSelectedId(PLAN_OPTION_CARDS[1].id)
    setClarifyMessage("Sure i'll try the local approach")
  }

  return (
    <div className="flex h-screen min-h-0 w-screen flex-col overflow-hidden bg-[#EADFFF]">
      <div className="flex min-h-0 min-w-0 flex-1">
        <Sidebar
          stage={stage}
          selectedId={selectedId}
          onSelectCard={setSelectedId}
          onCardDragStart={handleCardDragStart}
          clarifyMessage={clarifyMessage}
          onClarifyMessageChange={setClarifyMessage}
          onClarifySend={handleClarifySend}
          onConfirmSend={handleConfirmSend}
          progressState={progressState}
        />
        <FlowCanvas
          stage={stage}
          selectedId={selectedId}
          onDropCard={handleCardDrop}
          onKeepWorking={handleKeepWorking}
          onPerfect={handlePerfect}
          onShowPlan={handleShowPlan}
          onBackToWorkspace={handleBackToWorkspace}
        />
      </div>
      {/* <AppFooter /> */}
    </div>
  )
}

