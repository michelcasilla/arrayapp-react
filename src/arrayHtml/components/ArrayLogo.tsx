type Props = {
  size?: 'sm' | 'md'
  compactDots?: boolean
  className?: string
}

export const ArrayLogo = ({ size = 'md', compactDots = false, className = '' }: Props) => {
  const dims = size === 'sm' ? { w: compactDots ? 16 : 78, h: 22 } : { w: compactDots ? 25 : 134, h: 37 }

  const src = compactDots ? '/assets/logo-dots.svg' : '/assets/logo-array.svg'

  return (
    <img
      src={src}
      width={dims.w}
      height={dims.h}
      alt={compactDots ? '' : 'array'}
      className={`select-none ${className}`}
      draggable={false}
      style={{ display: 'block' }}
    />
  )
}

