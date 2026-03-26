import { useEffect } from 'react'
import { useReactFlow } from '@xyflow/react'

type Props = {
  /** Changes when stage or node set changes (not when dragging). */
  graphSignature: string
}

export const FitViewOnGraphChange = ({ graphSignature }: Props) => {
  const { fitView } = useReactFlow()

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 320, maxZoom: 1, minZoom: 0.28 })
    })
    return () => cancelAnimationFrame(id)
  }, [graphSignature, fitView])

  return null
}
