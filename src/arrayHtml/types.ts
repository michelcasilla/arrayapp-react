export type Stage =
  | 'define'
  | 'clarify-1'
  | 'clarify-2'
  | 'loading'
  | 'confirm-intro'
  | 'confirm'
  | 'revise'
  | 'key-pieces-loading'
  | 'key-pieces'
  | 'the-plan'

export type ProgressState = {
  activeIndex: number
  completed: number[]
}

