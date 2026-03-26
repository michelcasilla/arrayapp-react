type LinkItem =
  | {
      href: string
      label: string
      image?: { src: string; className: string; alt?: string }
      iconUseHref?: never
    }
  | {
      href: string
      label: string
      image?: never
      iconUseHref: string
    }

const Panel = ({
  id,
  iconUseHref,
  title,
  subtitle,
  links,
}: {
  id: string
  iconUseHref: string
  title: string
  subtitle: string
  links: LinkItem[]
}) => {
  return (
    <div id={id}>
      <svg className="icon" role="presentation" aria-hidden="true">
        <use href={iconUseHref}></use>
      </svg>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank">
              {'image' in link && link.image ? (
                <img className={link.image.className} src={link.image.src} alt={link.image.alt ?? ''} />
              ) : (
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href={link.iconUseHref}></use>
                </svg>
              )}
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const NextSteps = ({
  viteLogoSrc,
  reactLogoSrc,
}: {
  viteLogoSrc: string
  reactLogoSrc: string
}) => {
  return (
    <section id="next-steps">
      <Panel
        id="docs"
        iconUseHref="/icons.svg#documentation-icon"
        title="Documentation"
        subtitle="Your questions, answered"
        links={[
          {
            href: 'https://vite.dev/',
            label: 'Explore Vite',
            image: { src: viteLogoSrc, className: 'logo', alt: '' },
          },
          {
            href: 'https://react.dev/',
            label: 'Learn more',
            image: { src: reactLogoSrc, className: 'button-icon', alt: '' },
          },
        ]}
      />
      <Panel
        id="social"
        iconUseHref="/icons.svg#social-icon"
        title="Connect with us"
        subtitle="Join the Vite community"
        links={[
          { href: 'https://github.com/vitejs/vite', label: 'GitHub', iconUseHref: '/icons.svg#github-icon' },
          { href: 'https://chat.vite.dev/', label: 'Discord', iconUseHref: '/icons.svg#discord-icon' },
          { href: 'https://x.com/vite_js', label: 'X.com', iconUseHref: '/icons.svg#x-icon' },
          { href: 'https://bsky.app/profile/vite.dev', label: 'Bluesky', iconUseHref: '/icons.svg#bluesky-icon' },
        ]}
      />
    </section>
  )
}

