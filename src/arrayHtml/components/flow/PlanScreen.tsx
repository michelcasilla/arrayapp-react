import { useRef, useState } from 'react'
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

const ITEM_TYPES = {
  section: 'PLAN_SECTION',
  action: 'PLAN_ACTION',
} as const

const ALL_ACTIONS = [
  'Design out Invitations',
  'Write a short invite message with RSVP deadline',
  'Track RSVPs and update the guest list',
  'Track RSVPs and update the guest list',
] as const

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
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState('validated')
  const [sections, setSections] = useState<PlanSection[]>(INITIAL_SECTIONS)

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

  return (
    <div className="mx-auto h-full w-full max-w-[98vw] overflow-hidden px-8 pt-5 pb-5 text-[#2A107E]">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          className="btn-elevate rounded-full border border-[#BDAEEA] bg-white/70 px-3 py-1 text-[12px] font-semibold text-[#7A63CF] shadow-sm"
          onClick={onBackToWorkspace}
        >
          ← Back to Workspace
        </button>
      </div>

      <div className="relative rounded-2xl border border-[#BDAEEA] bg-white/70 px-4 py-2 shadow-sm mt-6">
        <button
          type="button"
          className="btn-elevate absolute right-3 top-2 rounded-md px-1 text-base text-[#7A63CF]"
          onClick={() => setMenuOpen((v) => !v)}
        >
          •••
        </button>
        <div className="flex items-center gap-4">
          <img src="/assets/icon-home.svg" alt="" className="h-[62px] w-[62px]" />
          <div>
            <h3 className="text-[14px] font-bold leading-none">Side Screenprinting Hustle</h3>
            <p className="mt-1 text-[12px] text-[#7A63CF]">March - December 2026</p>
            <p className="mt-1 text-[12px] text-[#2A107E]/80">
              I use the first 12 months to validate a viable, scalable screenprinting...
            </p>
          </div>
        </div>
        {menuOpen ? (
          <div className="absolute right-2 top-10 z-10 w-[190px] rounded-xl border border-[#BDAEEA] bg-white shadow-lg">
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
        <div className="rounded-2xl border border-[#BDAEEA] bg-white/70 p-3 shadow-sm">
          <h4 className="text-[16px] font-bold leading-none text-[#2D1C73]">Key Pieces (5)</h4>
          <ul className="mt-2 space-y-1 text-[12px] text-[#2A107E]/90">
            <li>● Validated Niche & Offer</li>
            <li>● Lean Production Engine</li>
            <li>● Customer Acquisition & Retention System</li>
            <li>● Cashflow & Risk Management</li>
            <li>● Brand & Process Assets</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[#BDAEEA] bg-white/70 p-3 shadow-sm">
          <h4 className="text-[16px] font-bold leading-none text-[#2D1C73]">Ready to Use (4)</h4>
          <ul className="mt-2 space-y-1.5 leading-tight">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="/assets/icon-download-calendar-ics.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Download Calendar (ics.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="/assets/icon-email-school-program.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Email to daughter's school/program</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="/assets/icon-short-message-husband.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Short Message to Send Your Husband</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#7A63CF]">
                <img src="/assets/icon-download-pdf-plan.svg" alt="" className="h-3 w-3" />
              </span>
              <span className="text-[12px]">Download PDF of Plan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-[16px] font-bold leading-none text-[#2D1C73]">Put your plan to work!</h4>
            <p className="mt-0.5 text-[12px] text-[#2A107E]/85">All actions you need to get complete this plan.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px]">View:</span>
            <select
              value={view}
              onChange={(e) => setView(e.target.value as 'by-key-pieces' | 'all-actions')}
              className="rounded-full border border-[#BDAEEA] bg-white px-3 py-1 text-[12px] text-[#2A107E]"
            >
              <option value="by-key-pieces">By Key Pieces</option>
              <option value="all-actions">All Actions</option>
            </select>
          </div>
        </div>

        {view === 'all-actions' ? (
          <div className="mt-2 rounded-2xl border border-[#BDAEEA] bg-white/70 p-3 shadow-sm">
            <h5 className="text-[14px] font-bold text-[#5C47B5]">All Actions</h5>
            <div className="mt-2 divide-y divide-[#E5DBFA]">
              {[...ALL_ACTIONS, ...ALL_ACTIONS, ...ALL_ACTIONS.slice(0, 2)].map((a, idx) => (
                <div key={`all-${idx}`} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-dashed border-[#8D72D8]/70" />
                    <div>
                      <p className="text-[12px] leading-tight">{a}</p>
                      <p className="text-[11px] italic text-[#7A63CF]">Nov 19, 2025</p>
                    </div>
                  </div>
                  <img src="/assets/icon-task-right.svg" alt="" className="h-5 w-5" />
                </div>
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
      className={`relative overflow-hidden rounded-xl border bg-white/70 transition-opacity ${
        isSectionDragging ? 'opacity-60' : 'opacity-100'
      } ${isSectionOver || isActionOverSection ? 'border-[#7A63CF]' : 'border-[#BDAEEA]'}`}
    >
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex w-8 items-start justify-center rounded-r-xl bg-[#7A63CF] pt-2">
        <img src="/assets/icon-arrow-accordion.svg" alt="" className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </div>
      <button type="button" className="btn-elevate flex w-full items-center justify-between pr-8 text-left" onClick={onToggleOpen}>
        <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2">
          <span className="h-5 w-1.5 rounded bg-[#7A63CF]" />
          <p className="truncate text-[13px] font-semibold text-[#5C47B5]">{displayTitle}</p>
        </div>
      </button>

      {isOpen ? (
        <div className="border-t border-[#E5DBFA] px-4 py-2 pr-10">
          {section.summary ? <p className="text-[12px] leading-tight text-[#2A107E]/85">{section.summary}</p> : null}
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
        <div className="h-5 w-5 rounded-full border-2 border-dashed border-[#8D72D8]/70" />
        <div>
          <p className="text-[12px] leading-tight">{action.label}</p>
          <p className="text-[11px] italic text-[#7A63CF]">Nov 19, 2025</p>
        </div>
      </div>
      <img src="/assets/icon-task-right.svg" alt="" className="h-5 w-5" />
    </div>
  )
}
