/**
 * Flow node positions — generous vertical gaps when layers appear; pan / wheel-scroll the canvas to see overflow.
 */
export const flowLayout = {
  x: {
    root: 520,
    leftCard: 220,
    centerCard: 530,
    rightCard: 840,
    pu: 665,
    basicsPill: 615,
    basicsPanel: 460,
    keyIcon: 665,
    keyLabel: 540,
    experts: 520,
    keyPiecesPanel: 330,
  },
  y: {
    root: 40,
    cards: 230,
    /** ~140px gap below card row before PU */
    pu: 500,
    /** ~120px below PU before “Basics” pill */
    basicsPill: 640,
    /** Confirm panel: extra clearance below pill */
    basicsPanel: 800,
    /** Key-piece icon row */
    keyIcon: 820,
    keyPiecesLabel: 960,
    experts: 1100,
    /** Left branch: key pieces panel */
    keyPiecesPanel: 940,
  },
} as const

export type FlowLayout = typeof flowLayout
