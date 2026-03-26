import type { ImgHTMLAttributes } from 'react'

type HeroImage = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'className' | 'width' | 'height'
>

export const Hero = ({
  hero,
  frameworkLogo,
  toolLogo,
}: {
  hero: HeroImage
  frameworkLogo: HeroImage
  toolLogo: HeroImage
}) => {
  return (
    <div className="hero">
      <img
        src={hero.src}
        className={hero.className}
        width={hero.width}
        height={hero.height}
        alt={hero.alt}
      />
      <img
        src={frameworkLogo.src}
        className={frameworkLogo.className}
        alt={frameworkLogo.alt}
      />
      <img src={toolLogo.src} className={toolLogo.className} alt={toolLogo.alt} />
    </div>
  )
}

