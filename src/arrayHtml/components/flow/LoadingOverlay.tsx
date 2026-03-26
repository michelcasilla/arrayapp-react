export const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#2A107E]/75">
      <img src="/assets/logo-dots.svg" alt="" className="h-24 w-24 rounded-2xl bg-white p-2" />
      <p className="mt-4 text-6xl font-bold text-white">Loading...</p>
    </div>
  )
}
