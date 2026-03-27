import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './HomePage.css'

type HomePageProps = {
  onSearch: (query: string) => void
}

const SUGGESTIONS = [
  'I have a couple months off this summer with overlapping family schedules, travel, and some personal goals - I want to figure out how to structure it so it actually feels fruitful, not chaotic',
  'It’s been a dream of mine to hike the fjords of Norway and stay in huts along the way, but I have no idea how to plan something like this without getting overwhelmed',
  'I’m thinking about starting a small screenprinting business with about $1k and doing it on the side. I’m trying to understand how to approach it without taking on too much risk',
  'I’m getting older and want to pull everything in my life together so it’s all in order - how should I be thinking about this?',
  'Feel like I’m always on the back foot with meals, shopping, and things around the house…I want to figure out how to get ahead of it and make it part of a real routine',
]

const WHAT_YOU_GET = [
  {
    imageSrc: '/images/ai.svg',
    imageAlt: 'Array AI',
    title: 'Clear decisions, not endless options',
    description: 'We distill complexity into a direction you can trust',
  },
  {
    imageSrc: '/images/dial.svg',
    imageAlt: 'Details',
    title: 'Tradeoffs and constraints handled for you',
    description: 'Time, energy, and priorities are accounted for upfront, not left to untangle later',
  },
  {
    imageSrc: '/images/list.svg',
    imageAlt: 'Plan List',
    title: 'Concrete next steps you can actually execute',
    description: 'A clear path forward - sequenced and ready to act on',
  },
]

export const HomePage = ({ onSearch }: HomePageProps) => {
  const [query, setQuery] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.max(50, textarea.scrollHeight)}px`
    textarea.classList.toggle('array-home-textarea-multiline', textarea.scrollHeight > 60)
  }, [query])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  return (
    <div className="array-home-root">
      <div className="array-home-page-content-wrapper">
        <div className="array-home-top-nav">
          <a href="/" onClick={(e) => e.preventDefault()}>
            <img src="/assets/logo-array.svg" width={120} className="array-home-logo" alt="Array" />
          </a>
          <button type="button" className="array-home-login-button">
            Log In
          </button>
        </div>

        <div id="top-call-for-action" className="array-home-top-call-for-action">
          <span className="array-home-headline">
            Structured intelligence for turning <br />
            intention into execution
          </span>
          <span className="array-home-headline-top">It matters, and it&apos;s worth having a real plan</span>
        </div>

        <header className="array-home-header">
          <form id="plan-request-form" className="array-home-input-block" onSubmit={handleSubmit}>
            <div className="array-home-input-row">
              <div className="array-home-input-full">
                <label className="array-home-prompt-container">
                  <textarea
                    ref={textareaRef}
                    name="plan_request"
                    placeholder="What are you trying to figure out?"
                    rows={1}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onInput={(event) => {
                      const textarea = event.currentTarget
                      textarea.style.height = 'auto'
                      textarea.style.height = `${Math.max(50, textarea.scrollHeight)}px`
                      textarea.classList.toggle('array-home-textarea-multiline', textarea.scrollHeight > 60)
                    }}
                    className="array-home-textarea"
                  />
                  <button id="request-plan-button" type="submit" className="array-home-request-plan-button">
                    <img src="/svg/prompt-arrow.svg" alt="Submit" />
                  </button>
                </label>
              </div>
            </div>
          </form>
        </header>

        <main className="array-home-main">
          <section className="array-home-description-wrap">
            <span className="array-home-description">
              Describe the situation you want to think through, including constraints, goals, and what&apos;s
              important to you
              <br /> (takes ~1-2 minutes. The more context you give, the better the plan).
            </span>
          </section>

          <div id="plan-suggestions" className="array-home-plan-suggestions">
            <div id="plan-suggestions-call-for-action" className="array-home-suggestion-text">
              Used to plan travel, family systems, business transitions, and major life decisions:
            </div>
            <ul id="plan-suggestion-list" className="array-home-plan-suggestion-list">
              {SUGGESTIONS.map((suggestion, index) => (
                <li
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className={`array-home-chip array-home-chip-${index + 1}`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          <div id="create-plan-explanation" className="array-home-create-plan-explanation">
            <div className="array-home-blue-gradient" />
            <h3 className="array-home-headline-sub">What you get</h3>
            <div className="array-home-how-to-card-container">
              {WHAT_YOU_GET.map((item) => (
                <div key={item.title} className="array-home-how-to-card">
                  <img src={item.imageSrc} alt={item.imageAlt} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <footer className="array-home-footer">
        <div className="array-home-footer-logo">
          <a href="/" onClick={(e) => e.preventDefault()}>
            <img src="/assets/logo-array.svg" alt="Array" width={135} />
          </a>
          <span className="array-home-footer-slogan">Structure for what matters.</span>
        </div>
        <ul className="array-home-footer-menu">
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
        </ul>
        <span className="array-home-footer-copyright">© {new Date().getFullYear()} Array</span>
      </footer>
    </div>
  )
}

