import { ArrayLogo } from './ArrayLogo'

export const AppFooter = () => {
  return (
    <footer className="flex min-h-[52px] shrink-0 items-center justify-between gap-6 bg-[#EADFFF] px-6 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <ArrayLogo size="sm" />
        <span className="truncate text-[13px] font-normal leading-tight text-[#2A107E]/85">Structure for what matters.</span>
      </div>
      <nav
        className="flex shrink-0 flex-wrap items-center justify-end gap-x-4 gap-y-1 text-[11px] font-semibold text-[#2A107E]"
        aria-label="Legal"
      >
        <a className="hover:underline" href="#">
          Privacy
        </a>
        <a className="hover:underline" href="#">
          Terms
        </a>
        <a className="hover:underline" href="#">
          Contact
        </a>
        <span className="font-semibold text-[#2A107E]/90">© 2026 Array</span>
      </nav>
    </footer>
  )
}

