export const GrabHand = () => {
  return (
    <div className="pointer-events-none absolute right-[140px] top-[140px] z-10 opacity-80" aria-hidden="true">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#2A107E]">
        <path
          d="M8 10V7a2 2 0 114 0v3m-4 0V6a2 2 0 114 0v4m-4 0V8a2 2 0 114 0v2m8 2v1l2 6H9l-3-7a2 2 0 012-2h6z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
