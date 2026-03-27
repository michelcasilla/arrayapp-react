import { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

type Props = {
  onBackToWorkspace: () => void
}

type PlanAction = {
  id: string
  label: string
}

type PlanSection = {
  id: string
  title: string
  summary?: string
  actions: PlanAction[]
}

type DragSectionItem = {
  type: 'PLAN_SECTION'
  sectionId: string
  index: number
}

type DragActionItem = {
  type: 'PLAN_ACTION'
  actionId: string
  fromSectionId: string
}

type DragAllActionItem = {
  type: 'ALL_ACTION'
  actionId: string
  index: number
}

const ITEM_TYPES = {
  section: 'PLAN_SECTION',
  action: 'PLAN_ACTION',
  allAction: 'ALL_ACTION',
} as const

/** Inter 700 16px — accordion section titles e.g. “Validated Niche & Offer (4)” */
const planAccordionSectionTitleClass =
  "font-['Inter',sans-serif] text-[16px] font-bold leading-[1.5] tracking-[0.005em] text-[#6B47E2]"
/** “All Actions” panel title inside white card */
const planAllActionsPanelTitleClass =
  "font-['Inter',sans-serif] text-[14px] font-normal leading-[24px] tracking-normal text-[#331763]"
/** Subtitle bajo “Put your plan to work!” */
const planPutWorkSubtitleClass =
  "font-['Inter',sans-serif] text-[16px] font-normal leading-[0.7] tracking-[0.005em] text-[#331763]"
/** Ítems lista Key Pieces (bullets) */
const planKeyPieceListItemClass =
  "font-['Inter',sans-serif] text-[14px] font-normal leading-[1.5] tracking-[0.005em] text-[#331763]"
/** Etiquetas filas Ready to Use */
const planReadyToUseLabelClass =
  "font-['Inter',sans-serif] text-[14px] font-medium leading-[1.5] tracking-[0.005em] text-[#2A107E]"
/** “View:” */
const planViewLabelClass =
  "font-['Inter',sans-serif] text-[14px] font-normal leading-[1.5] tracking-[0.005em] text-[#331763]"
/** Párrafos cuerpo 14px (resumen sección, etc.) */
const planBodyCopy14Class =
  "font-['Inter',sans-serif] text-[14px] font-normal leading-[1.5] tracking-[0.005em] text-[#2A107E]"
/** Inter 400 16px — action title */
const planActionBodyClass =
  "font-['Inter',sans-serif] text-[16px] font-normal leading-[1.5] tracking-[0.005em] text-[#331763]"
/** Inter 400 italic 14px — date under action */
const planActionDateClass =
  "font-['Inter',sans-serif] text-[14px] font-normal italic leading-[1.5] tracking-[0.005em] text-[#6B47E2]"

const VIEW_OPTIONS = [
  { value: 'by-key-pieces' as const, label: 'By Key Pieces' },
  { value: 'all-actions' as const, label: 'All Actions' },
]

const ALL_ACTIONS = [
  'Design out Invitations',
  'Write a short invite message with RSVP deadline',
  'Track RSVPs and update the guest list',
  'Track RSVPs and update the guest list',
] as const

const INITIAL_ALL_ACTIONS = [...ALL_ACTIONS, ...ALL_ACTIONS, ...ALL_ACTIONS.slice(0, 2)].map((label, index) => ({
  id: `all-action-${index}`,
  label,
}))

const INITIAL_SECTIONS: PlanSection[] = [
  {
    id: 'validated',
    title: 'Validated Niche & Offer',
    summary:
      'Define and test a focused combination of customer segment, use-case, and screenprinted product that can predictably generate $2,000+/month in revenue with minimal upfront risk....',
    actions: ALL_ACTIONS.slice(0, 4).map((label, idx) => ({ id: `validated-${idx}`, label })),
  },
  {
    id: 'lean',
    title: 'Lean Production Engine',
    actions: ALL_ACTIONS.slice(0, 3).map((label, idx) => ({ id: `lean-${idx}`, label })),
  },
  {
    id: 'customer',
    title: 'Customer Acquisition & Retention System',
    actions: ALL_ACTIONS.slice(0, 3).map((label, idx) => ({ id: `customer-${idx}`, label })),
  },
  {
    id: 'cashflow',
    title: 'Cashflow & Risk Management',
    actions: ALL_ACTIONS.slice(0, 3).map((label, idx) => ({ id: `cashflow-${idx}`, label })),
  },
  {
    id: 'brand',
    title: 'Brand & Process Assets',
    actions: ALL_ACTIONS.slice(0, 3).map((label, idx) => ({ id: `brand-${idx}`, label })),
  },
]

export const PlanScreen = ({ onBackToWorkspace }: Props) => {
  const [view, setView] = useState<'by-key-pieces' | 'all-actions'>('by-key-pieces')
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const viewMenuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState('validated')
  const [sections, setSections] = useState<PlanSection[]>(INITIAL_SECTIONS)
  const [allActions, setAllActions] = useState(INITIAL_ALL_ACTIONS)
  const keyPieceTitles = sections.map((section) => section.title)

  const moveSection = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    setSections((prev) => {
      if (fromIndex < 0 || toIndex < 0) return prev
      const next = [...prev]
      const [draggedSection] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, draggedSection)
      return next
    })
  }

  const moveAction = (draggedActionId: string, fromSectionId: string, toSectionId: string, toActionId: string) => {
    if (draggedActionId === toActionId && fromSectionId === toSectionId) return
    setSections((prev) => {
      const sourceIndex = prev.findIndex((section) => section.id === fromSectionId)
      const targetIndex = prev.findIndex((section) => section.id === toSectionId)
      if (sourceIndex < 0 || targetIndex < 0) return prev

      const sourceSection = prev[sourceIndex]
      const draggedAction = sourceSection.actions.find((action) => action.id === draggedActionId)
      if (!draggedAction) return prev

      const sourceActionIndex = sourceSection.actions.findIndex((action) => action.id === draggedActionId)
      if (sourceActionIndex < 0) return prev

      const next = prev.map((section) => ({ ...section, actions: [...section.actions] }))
      const [removedAction] = next[sourceIndex].actions.splice(sourceActionIndex, 1)
      const insertIndex = next[targetIndex].actions.findIndex((action) => action.id === toActionId)
      next[targetIndex].actions.splice(insertIndex < 0 ? next[targetIndex].actions.length : insertIndex, 0, removedAction)
      return next
    })
  }

  const moveActionToSectionEnd = (draggedActionId: string, fromSectionId: string, toSectionId: string) => {
    if (fromSectionId === toSectionId) return
    setSections((prev) => {
      const sourceIndex = prev.findIndex((section) => section.id === fromSectionId)
      const targetIndex = prev.findIndex((section) => section.id === toSectionId)
      if (sourceIndex < 0 || targetIndex < 0) return prev

      const sourceActionIndex = prev[sourceIndex].actions.findIndex((action) => action.id === draggedActionId)
      if (sourceActionIndex < 0) return prev

      const next = prev.map((section) => ({ ...section, actions: [...section.actions] }))
      const [removedAction] = next[sourceIndex].actions.splice(sourceActionIndex, 1)
      next[targetIndex].actions.push(removedAction)
      return next
    })
  }

  useEffect(() => {
    if (!viewMenuOpen) return undefined
    const onDocDown = (e: MouseEvent) => {
      if (viewMenuRef.current?.contains(e.target as Node)) return
      setViewMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [viewMenuOpen])

  const moveAllAction = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    setAllActions((prev) => {
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= prev.length || toIndex >= prev.length) return prev
      const next = [...prev]
      const [draggedAction] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, draggedAction)
      return next
    })
  }

  return (
    <div className="mx-auto w-full max-w-[98vw] min-h-0 px-8 pt-5 pb-5 text-[#2A107E]">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          className="btn-elevate rounded-full border-2 border-[#BA98FF] bg-white px-3 py-2 text-center font-['Inter',sans-serif] text-[16px] font-semibold leading-[1.5] tracking-[0.015em] text-[#795ADF] shadow-sm"
          onClick={onBackToWorkspace}
        >
          ← Back to Workspace
        </button>
      </div>

      <div className="relative mt-6 rounded-[26px] border-2 border-[#BA98FF] bg-white px-4 py-3 shadow-sm">
        <button
          type="button"
          className="btn-elevate absolute right-3 top-2 rounded-md px-1 text-base text-[#7A63CF]"
          onClick={() => setMenuOpen((v) => !v)}
        >
          •••
        </button>
        <div className="flex items-center gap-4">
          <img src="/assets/icon-piggy-bank.svg" alt="" className="h-[62px] w-[62px]" />
          <div>
            <h3 className="font-['Inter',sans-serif] text-[20px] font-bold leading-[1.5] tracking-[0.005em] text-[#2D1C73]">
              Side Screenprinting Hustle
            </h3>
            <p className="mt-1 font-['Inter',sans-serif] text-[14px] font-normal italic leading-[1.5] tracking-[0.005em] text-[#6B47E2]">
              March - December 2026
            </p>
            <p className={`mt-1 ${planBodyCopy14Class}`}>
              I use the first 12 months to validate a viable, scalable screenprinting...
            </p>
          </div>
        </div>
        {menuOpen ? (
          <div className="absolute right-2 top-10 z-10 w-[190px] rounded-xl border-2 border-[#BA98FF] bg-white shadow-lg">
            <button
              type="button"
              className="btn-elevate flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]"
            >
              <img src="/assets/icon-edit-plan-information.svg" alt="" className="h-3.5 w-3.5" />
              <span>Edit Plan Information</span>
            </button>
            <button
              type="button"
              className="btn-elevate flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]"
            >
              <img src="/assets/icon-clone-plan.svg" alt="" className="h-3.5 w-3.5" />
              <span>Clone Plan</span>
            </button>
            <button
              type="button"
              className="btn-elevate flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]"
            >
              <img src="/assets/icon-delete-plan.svg" alt="" className="h-3.5 w-3.5" />
              <span>Delete Plan</span>
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_270px] gap-3">
        <div className="flex flex-col gap-4 rounded-[26px] border-2 border-[#BA98FF] bg-white p-4 shadow-sm">
          <h4 className="font-['Inter',sans-serif] text-[20px] font-bold leading-[1.5] tracking-[0.005em] text-[#2D1C73]">
            Key Pieces ({keyPieceTitles.length})
          </h4>
          <ul className="space-y-3">
            {keyPieceTitles.map((title) => (
              <li key={title} className="flex items-center gap-3">
                <img src="/assets/ellipse-13.svg" alt="" className="h-2.5 w-2.5 shrink-0" />
                <span className={planKeyPieceListItemClass}>{title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[26px] border-2 border-[#BA98FF] bg-white p-4 shadow-sm">
          <h4 className="font-['Inter',sans-serif] text-[20px] font-bold leading-[1.5] tracking-[0.005em] text-[#2D1C73]">
            Ready to Use (4)
          </h4>
          <ul className="mt-3 space-y-3">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[3px] bg-[#7A63CF]">
                <img src="/assets/icon-ready-calendar.svg" alt="" className="h-[15px] w-[15px]" />
              </span>
              <span className={planReadyToUseLabelClass}>Download Calendar (ics.)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[3px] bg-[#7A63CF]">
                <img src="/assets/icon-email-school-program.svg" alt="" className="h-[15px] w-[15px]" />
              </span>
              <span className={planReadyToUseLabelClass}>Email to daughter&apos;s school/program</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[3px] bg-[#7A63CF]">
                <img src="/assets/icon-short-message-husband.svg" alt="" className="h-[15px] w-[15px]" />
              </span>
              <span className={planReadyToUseLabelClass}>Short Message to Send Your Husband</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[3px] bg-[#7A63CF]">
                <img src="/assets/icon-ready-download-pdf.svg" alt="" className="h-[15px] w-[12px] object-contain" />
              </span>
              <span className={planReadyToUseLabelClass}>Download PDF of Plan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between">
          <div>
            <h4 className="font-['Inter',sans-serif] text-[20px] font-bold leading-[1.5] tracking-[0.005em] text-[#2D1C73]">
              Put your plan to work!
            </h4>
            <p className={`mt-0.5 ${planPutWorkSubtitleClass}`}>All actions you need to get complete this plan.</p>
          </div>
          <div ref={viewMenuRef} className="relative flex items-center gap-2.5">
            <span className={planViewLabelClass}>View:</span>
            <button
              type="button"
              id="plan-view-select-trigger"
              aria-haspopup="listbox"
              aria-expanded={viewMenuOpen}
              aria-controls="plan-view-select-list"
              onClick={() => setViewMenuOpen((o) => !o)}
              className="btn-elevate flex h-10 w-[163px] shrink-0 items-center justify-between gap-2 rounded-full border border-[#BA98FF] bg-white py-2 pl-3 pr-3 text-left font-['Inter',sans-serif] text-[14px] text-[#331763] shadow-sm outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[#795ADF]/40"
            >
              <span className="min-w-0 truncate">
                {VIEW_OPTIONS.find((o) => o.value === view)?.label ?? 'By Key Pieces'}
              </span>
              <img
                src="/assets/icon-chevron-down.svg"
                alt=""
                className={`shrink-0 transition-transform duration-200 ${viewMenuOpen ? 'rotate-180' : ''}`}
                width={16}
                height={16}
              />
            </button>
            {viewMenuOpen ? (
              <ul
                id="plan-view-select-list"
                role="listbox"
                aria-labelledby="plan-view-select-trigger"
                className="absolute right-0 top-[calc(100%+6px)] z-30 min-w-[163px] overflow-hidden rounded-[18px] border border-[#BA98FF] bg-white py-1 shadow-[0_10px_28px_rgba(42,16,126,0.14)]"
              >
                {VIEW_OPTIONS.map((opt) => {
                  const selected = view === opt.value
                  return (
                    <li key={opt.value} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        className={`btn-elevate w-full px-3 py-2.5 text-left font-['Inter',sans-serif] text-[14px] leading-normal transition-colors ${
                          selected
                            ? 'bg-[#EADDFF] font-medium text-[#2A107E]'
                            : 'text-[#331763] hover:bg-[#F4EFFF]'
                        }`}
                        onClick={() => {
                          setView(opt.value)
                          setViewMenuOpen(false)
                        }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>

        {view === 'all-actions' ? (
          <div className="mt-2 rounded-[26px] border-2 border-[#BA98FF] bg-white p-4 shadow-sm">
            <h5 className={planAllActionsPanelTitleClass}>All Actions</h5>
            <div className="mt-2 divide-y divide-[#E5DBFA]">
              {allActions.map((action, index) => (
                <DraggableAllActionsRow
                  key={action.id}
                  actionId={action.id}
                  label={action.label}
                  index={index}
                  onMove={moveAllAction}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-2 space-y-1.5">
            {sections.map((section, index) => (
              <DraggableSectionCard
                key={section.id}
                index={index}
                section={section}
                isOpen={openSection === section.id}
                onToggleOpen={() => setOpenSection((s) => (s === section.id ? '' : section.id))}
                onMoveSection={moveSection}
                onMoveAction={moveAction}
                onMoveActionToSectionEnd={moveActionToSectionEnd}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

type DraggableAllActionsRowProps = {
  actionId: string
  label: string
  index: number
  onMove: (fromIndex: number, toIndex: number) => void
}

const DraggableAllActionsRow = ({ actionId, label, index, onMove }: DraggableAllActionsRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPES.allAction,
      item: { type: ITEM_TYPES.allAction, actionId, index } as DragAllActionItem,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [actionId, index],
  )

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ITEM_TYPES.allAction,
      hover: (item: unknown, monitor) => {
        const dragItem = item as DragAllActionItem
        if (!rowRef.current) return
        if (dragItem.index === index) return

        const hoverRect = rowRef.current.getBoundingClientRect()
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset) return
        const hoverClientY = clientOffset.y - hoverRect.top

        if (dragItem.index < index && hoverClientY < hoverMiddleY) return
        if (dragItem.index > index && hoverClientY > hoverMiddleY) return

        onMove(dragItem.index, index)
        dragItem.index = index
      },
      collect: (monitor) => ({ isOver: monitor.isOver({ shallow: true }) }),
    }),
    [index, onMove],
  )

  const setRefs = (node: HTMLDivElement | null) => {
    rowRef.current = node
    dragRef(node)
    dropRef(node)
  }

  return (
    <div ref={setRefs} className={`flex items-center justify-between py-1.5 ${isDragging ? 'opacity-40' : ''}`}>
      <div className={`flex items-center gap-3 ${isOver ? 'rounded-md bg-[#F2ECFD] px-2 py-1' : ''}`}>
        <img src="/assets/icon-action-dashed-ellipse.svg" alt="" className="h-[29px] w-[29px] shrink-0" />
        <div>
          <p className={planActionBodyClass}>{label}</p>
          <p className={planActionDateClass}>Nov 19, 2025</p>
        </div>
      </div>
      <img src="/assets/icon-task-right.svg" alt="" className="h-[31.367px] w-[31.367px] shrink-0" />
    </div>
  )
}

type DraggableSectionCardProps = {
  index: number
  section: PlanSection
  isOpen: boolean
  onToggleOpen: () => void
  onMoveSection: (fromIndex: number, toIndex: number) => void
  onMoveAction: (draggedActionId: string, fromSectionId: string, toSectionId: string, toActionId: string) => void
  onMoveActionToSectionEnd: (draggedActionId: string, fromSectionId: string, toSectionId: string) => void
}

const DraggableSectionCard = ({
  index,
  section,
  isOpen,
  onToggleOpen,
  onMoveSection,
  onMoveAction,
  onMoveActionToSectionEnd,
}: DraggableSectionCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const [{ isSectionDragging }, dragSectionRef] = useDrag(
    () => ({
      type: ITEM_TYPES.section,
      item: { type: ITEM_TYPES.section, sectionId: section.id, index } as DragSectionItem,
      collect: (monitor) => ({ isSectionDragging: monitor.isDragging() }),
    }),
    [index, section.id],
  )

  const [{ isSectionOver }, dropSectionRef] = useDrop(
    () => ({
      accept: ITEM_TYPES.section,
      hover: (item: unknown, monitor) => {
        const dragItem = item as DragSectionItem
        if (!cardRef.current) return
        if (dragItem.index === index) return

        const hoverRect = cardRef.current.getBoundingClientRect()
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset) return
        const hoverClientY = clientOffset.y - hoverRect.top

        if (dragItem.index < index && hoverClientY < hoverMiddleY) return
        if (dragItem.index > index && hoverClientY > hoverMiddleY) return

        onMoveSection(dragItem.index, index)
        dragItem.index = index
        dragItem.sectionId = section.id
      },
      collect: (monitor) => ({ isSectionOver: monitor.isOver({ shallow: true }) }),
    }),
    [index, onMoveSection, section.id],
  )

  const [{ isActionOverSection }, dropActionIntoSectionRef] = useDrop(
    () => ({
      accept: ITEM_TYPES.action,
      drop: (item: unknown) => {
        const dragItem = item as DragActionItem
        onMoveActionToSectionEnd(dragItem.actionId, dragItem.fromSectionId, section.id)
        dragItem.fromSectionId = section.id
      },
      collect: (monitor) => ({ isActionOverSection: monitor.isOver({ shallow: true }) }),
    }),
    [onMoveActionToSectionEnd, section.id],
  )

  const setRefs = (node: HTMLDivElement | null) => {
    cardRef.current = node
    dragSectionRef(node)
    dropSectionRef(node)
    dropActionIntoSectionRef(node)
  }

  const displayTitle = `${section.title} (${section.actions.length})`

  return (
    <div
      ref={setRefs}
      className={`relative overflow-hidden rounded-[26px] border-2 bg-white shadow-sm transition-opacity ${
        isSectionDragging ? 'opacity-60' : 'opacity-100'
      } ${isSectionOver || isActionOverSection ? 'border-[#7A63CF]' : 'border-[#BA98FF]'}`}
    >
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex w-8 items-start justify-center rounded-r-[26px] bg-[#7A63CF] pt-2">
        <img src="/assets/icon-arrow-accordion.svg" alt="" className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </div>
      <button type="button" className="btn-elevate flex w-full items-center justify-between pr-8 text-left" onClick={onToggleOpen}>
        <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2">
          <span className="h-5 w-1.5 rounded bg-[#7A63CF]" />
          <p className={`truncate ${planAccordionSectionTitleClass}`}>{displayTitle}</p>
        </div>
      </button>

      {isOpen ? (
        <div className="border-t border-[#E5DBFA] px-4 py-2 pr-10">
          {section.summary ? <p className={planBodyCopy14Class}>{section.summary}</p> : null}
          <div className="mt-2 divide-y divide-[#E5DBFA]">
            {section.actions.map((action) => (
              <DraggableActionRow
                key={action.id}
                sectionId={section.id}
                action={action}
                onMoveAction={onMoveAction}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

type DraggableActionRowProps = {
  sectionId: string
  action: PlanAction
  onMoveAction: (draggedActionId: string, fromSectionId: string, toSectionId: string, toActionId: string) => void
}

const DraggableActionRow = ({ sectionId, action, onMoveAction }: DraggableActionRowProps) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPES.action,
      item: { type: ITEM_TYPES.action, actionId: action.id, fromSectionId: sectionId } as DragActionItem,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [action.id, sectionId],
  )

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ITEM_TYPES.action,
      hover: (item: unknown) => {
        const dragItem = item as DragActionItem
        if (dragItem.actionId === action.id && dragItem.fromSectionId === sectionId) return
        onMoveAction(dragItem.actionId, dragItem.fromSectionId, sectionId, action.id)
        dragItem.fromSectionId = sectionId
      },
      collect: (monitor) => ({ isOver: monitor.isOver({ shallow: true }) }),
    }),
    [action.id, onMoveAction, sectionId],
  )

  const setRefs = (node: HTMLDivElement | null) => {
    dragRef(node)
    dropRef(node)
  }

  return (
    <div ref={setRefs} className={`flex items-center justify-between py-1.5 ${isDragging ? 'opacity-40' : ''}`}>
      <div className={`flex items-center gap-3 ${isOver ? 'rounded-md bg-[#F2ECFD] px-2 py-1' : ''}`}>
        <img src="/assets/icon-action-dashed-ellipse.svg" alt="" className="h-[29px] w-[29px] shrink-0" />
        <div>
          <p className={planActionBodyClass}>{action.label}</p>
          <p className={planActionDateClass}>Nov 19, 2025</p>
        </div>
      </div>
      <img src="/assets/icon-task-right.svg" alt="" className="h-[31.367px] w-[31.367px] shrink-0" />
    </div>
  )
}
