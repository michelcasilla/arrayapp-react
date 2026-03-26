import { useState } from 'react'

export const PlanScreen = () => {
  const [view, setView] = useState<'by-key-pieces' | 'all-actions'>('by-key-pieces')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState('validated')

  const actions = [
    'Design out Invitations',
    'Write a short invite message with RSVP deadline',
    'Track RSVPs and update the guest list',
    'Track RSVPs and update the guest list',
  ]

  const collapsedSections = [
    'Lean Production Engine (3)',
    'Customer Acquisition & Retention System (12)...',
    'Cashflow & Risk Management (4)',
    'Brand & Process Assets (9)',
  ]

  return (
    <div className="mx-auto h-full w-full max-w-[1000px] overflow-hidden px-8 pt-5 pb-5 text-[#2A107E]">
      <div className="mb-3 flex items-center justify-between">
        <button className="rounded-full border border-[#BDAEEA] bg-white/70 px-3 py-1 text-[12px] font-semibold text-[#7A63CF]">
          ← Back to Workspace
        </button>
      </div>

      <div className="relative rounded-2xl border border-[#BDAEEA] bg-white/70 px-4 py-2 shadow-sm">
        <button className="absolute right-3 top-2 text-base text-[#7A63CF]" onClick={() => setMenuOpen((v) => !v)}>
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
            <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]">
              <img src="/assets/icon-edit-plan-information.svg" alt="" className="h-3.5 w-3.5" />
              <span>Edit Plan Information</span>
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]">
              <img src="/assets/icon-clone-plan.svg" alt="" className="h-3.5 w-3.5" />
              <span>Clone Plan</span>
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] hover:bg-[#F2ECFD]">
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
              {[...actions, ...actions, ...actions.slice(0, 2)].map((a, idx) => (
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
            {[{ key: 'validated', title: 'Validated Niche & Offer (4)' }, ...collapsedSections.map((t) => ({ key: t, title: t }))].map(
              (section) => (
                <div key={section.key} className="relative overflow-hidden rounded-xl border border-[#BDAEEA] bg-white/70">
                  <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex w-8 items-start justify-center rounded-r-xl bg-[#7A63CF] pt-2">
                    <img
                      src="/assets/icon-arrow-accordion.svg"
                      alt=""
                      className={`h-3 w-3 transition-transform ${openSection === section.key ? 'rotate-90' : ''}`}
                    />
                  </div>
                  <button
                    className="flex w-full items-center justify-between pr-8 text-left"
                    onClick={() => setOpenSection((s) => (s === section.key ? '' : section.key))}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2">
                      <span className="h-5 w-1.5 rounded bg-[#7A63CF]" />
                      <p className="truncate text-[13px] font-semibold text-[#5C47B5]">{section.title}</p>
                    </div>
                  </button>

                  {openSection === section.key ? (
                    <div className="border-t border-[#E5DBFA] px-4 py-2 pr-10">
                      {section.key === 'validated' ? (
                        <p className="text-[12px] leading-tight text-[#2A107E]/85">
                          Define and test a focused combination of customer segment, use-case, and screenprinted product that can predictably
                          generate $2,000+/month in revenue with minimal upfront risk....
                        </p>
                      ) : null}
                      <div className="mt-2 divide-y divide-[#E5DBFA]">
                        {actions.slice(0, section.key === 'validated' ? 4 : 3).map((a, idx) => (
                          <div key={`${section.key}-${idx}`} className="flex items-center justify-between py-1.5">
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
                  ) : null}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
