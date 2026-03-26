import type { CSSProperties } from 'react'

/** Invisible handles used only for edge anchoring in React Flow. */
export const hiddenHandleStyle: CSSProperties = {
  opacity: 0,
  width: 8,
  height: 8,
  background: 'transparent',
  border: 'none',
}
