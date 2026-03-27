import { useEffect, useRef, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
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

const MOCK_PLAN_STATE_CARDS = [
  {
    type: 'completed',
    title: "Sienna's Birthday Party",
    date: 'Nov 30, 2025 (20 days remaining)',
    actionText: 'Get emails for the 12 friends for Sienna’s party',
    actionDate: 'Nov 19, 2025',
    moreActions: '+ 12 more Actions',
    cta: 'View This Plan',
    iconSrc: '/images/icon-confetti.svg',
    searchQuery:
      'Help me finalize Sienna birthday party planning with invites, timeline, supplies, budget, and next actions.',
  },
  {
    type: 'in-progress',
    title: 'Research Summer Camps',
    description: 'Currently building and analyzing this plan....',
    iconSrc: '/images/plan-card-nodes.svg',
    searchQuery:
      'Compare summer camp options by schedule, budget, location, quality, and help me choose the best fit.',
  },
  {
    type: 'questions',
    title: 'Trip to Scotland',
    description: 'I need additional information from you...',
    iconSrc: '/images/plan-card-nodes.svg',
    searchQuery:
      'Plan a trip to Scotland and ask me the missing questions needed to build a complete itinerary.',
  },
] as const

export const HomePage = ({ onSearch }: HomePageProps) => {
  const [query, setQuery] = useState('')
  const [signinOpen, setSigninOpen] = useState(false)
  const [signinEmail, setSigninEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [firstName, setFirstName] = useState('Michel')
  const [lastName, setLastName] = useState('Casilla')
  const [profileEmail, setProfileEmail] = useState('michel@arrayforall.com')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.max(50, textarea.scrollHeight)}px`
    textarea.classList.toggle('array-home-textarea-multiline', textarea.scrollHeight > 60)
  }, [query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSigninOpen(false)
        setProfileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  const handleSigninSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoggedIn(true)
    setSigninOpen(false)
    if (signinEmail.trim()) setProfileEmail(signinEmail.trim())
    setSigninEmail('')
  }

  const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setProfileOpen(false)
    setIsLoggedIn(false)
  }

  const handleMockCardClick = (searchQuery: string) => {
    onSearch(searchQuery)
  }

  return (
    <div className="array-home-root">
      <div className="array-home-page-content-wrapper">
        <div className="array-home-top-nav">
          <a href="/" onClick={(e) => e.preventDefault()}>
            <img src="/assets/logo-array.svg" width={120} className="array-home-logo" alt="Array" />
          </a>
          {isLoggedIn ? (
            <button
              id="user-avatar"
              type="button"
              className="array-home-user-avatar"
              onClick={() => setProfileOpen(true)}
              aria-label="Open profile panel"
            >
              <img src="/images/default-avatar.png" alt="Profile" />
            </button>
          ) : (
            <button type="button" className="array-home-login-button" onClick={() => setSigninOpen(true)}>
              Log In
            </button>
          )}
        </div>

        <div id="top-call-for-action" className="array-home-top-call-for-action">
          {isLoggedIn ? (
            <span className="array-home-headline">Welcome back, Guest</span>
          ) : (
            <>
              <span className="array-home-headline">
                Structured intelligence for turning <br />
                intention into execution
              </span>
              <span className="array-home-headline-top">It matters, and it&apos;s worth having a real plan</span>
            </>
          )}
        </div>

        <header className="array-home-header">
          <form id="plan-request-form" className="array-home-input-block" onSubmit={handleSubmit}>
            <div className="array-home-input-row">
              <div className="array-home-input-full">
                <label className="array-home-prompt-container">
                  <textarea
                    ref={textareaRef}
                    name="plan_request"
                    placeholder={isLoggedIn ? 'What can Array help you with today?' : 'What are you trying to figure out?'}
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

          <section className="array-home-plan-state-cards" aria-label="Plan card states">
            {MOCK_PLAN_STATE_CARDS.map((card) => (
              <article
                key={`${card.type}-${card.title}`}
                className={`array-home-plan-state-card array-home-plan-state-card--${card.type}`}
                onClick={() => handleMockCardClick(card.searchQuery)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleMockCardClick(card.searchQuery)
                  }
                }}
              >
                {card.type === 'completed' ? (
                  <>
                    <div className="array-home-plan-completed-header">
                      <img src={card.iconSrc} alt="" aria-hidden="true" className="array-home-plan-completed-icon" />
                      <div className="array-home-plan-completed-title-wrap">
                        <h3 className="array-home-plan-completed-title">{card.title}</h3>
                        <p className="array-home-plan-completed-date">{card.date}</p>
                      </div>
                    </div>
                    <div className="array-home-plan-completed-action-wrap">
                      <span className="array-home-plan-completed-action-circle" aria-hidden="true" />
                      <div className="array-home-plan-completed-action-copy">
                        <p className="array-home-plan-completed-action-text">{card.actionText}</p>
                        <p className="array-home-plan-completed-action-date">{card.actionDate}</p>
                      </div>
                    </div>
                    <p className="array-home-plan-completed-more-actions">{card.moreActions}</p>
                    <div className="array-home-plan-completed-footer">
                      <a href="#" onClick={(event) => event.preventDefault()} className="array-home-plan-completed-link">
                        {card.cta} <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <header
                      className={`array-home-plan-state-header array-home-plan-state-header--${
                        card.type === 'in-progress' ? 'teal' : 'pink'
                      }`}
                    >
                      <span className="array-home-plan-state-header-icon" aria-hidden="true">
                        {card.type === 'in-progress' ? (
                          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M23.282 13.4098L21.3323 12.8912C21.2356 12.585 21.1155 12.2906 20.9748 12.0049L21.9812 10.269C22.0808 10.0962 22.0354 9.87643 21.8758 9.75778C21.2517 9.29778 20.7038 8.74846 20.2453 8.12586C20.1691 8.02185 20.052 7.96619 19.9304 7.96619C19.863 7.96619 19.7956 7.98377 19.7341 8.01892L17.9982 9.02531C17.7125 8.88468 17.4181 8.76456 17.1105 8.66788L16.5919 6.71956C16.5406 6.52766 16.359 6.40461 16.1553 6.43244C15.3892 6.54817 14.6128 6.54817 13.8467 6.43244C13.8276 6.42951 13.8071 6.42805 13.7881 6.42805C13.6138 6.42805 13.4556 6.54524 13.4102 6.7181L12.8857 8.69132C12.5928 8.78947 12.31 8.90666 12.0361 9.04289L10.2695 8.01891C10.2079 7.98376 10.1406 7.96618 10.0732 7.96618C9.95306 7.96618 9.8344 8.02185 9.75823 8.12439C9.2997 8.74699 8.75038 9.29631 8.12633 9.7563C7.96519 9.87496 7.91978 10.0947 8.02085 10.2676L9.04482 12.0342C8.90859 12.3082 8.7914 12.5909 8.69325 12.8839L6.72005 13.4083C6.52815 13.4595 6.4051 13.6485 6.4344 13.8448C6.55012 14.611 6.55012 15.3874 6.4344 16.152C6.4051 16.3498 6.52815 16.5373 6.72005 16.5886L8.66981 17.1072C8.76649 17.4133 8.88661 17.7078 9.02724 17.9934L8.02086 19.7279C7.92125 19.9007 7.96666 20.1205 8.12633 20.2391C8.75039 20.6991 9.29825 21.2484 9.75677 21.871C9.87396 22.0322 10.0952 22.0761 10.268 21.978L12.0039 20.9716C12.2896 21.1122 12.584 21.2324 12.8902 21.329L13.4087 23.2773C13.46 23.4692 13.6431 23.5908 13.8453 23.5645C14.6114 23.4487 15.3878 23.4487 16.1539 23.5645C16.3473 23.5923 16.5392 23.4707 16.5905 23.2773L17.1149 21.3041C17.4079 21.206 17.6906 21.0888 17.9645 20.9511L19.7312 21.9751C19.904 22.0732 20.1252 22.0293 20.2424 21.8681C20.701 21.2455 21.2503 20.6962 21.8743 20.2377C22.0355 20.119 22.0809 19.8993 21.9798 19.7264L20.9558 17.9598C21.0921 17.6858 21.2093 17.4031 21.3074 17.1101L23.2806 16.5857C23.4725 16.5344 23.5956 16.3455 23.5663 16.1491C23.4505 15.383 23.4505 14.6066 23.5663 13.8419C23.5956 13.6442 23.4725 13.4567 23.2806 13.4054L23.282 13.4098Z"
                              fill="#F5F0FF"
                            />
                          </svg>
                        ) : (
                          <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M26.5298 18.2979L16.0776 1.44109C15.5174 0.538805 14.5542 0 13.4998 0C12.4453 0 11.4821 0.538805 10.9219 1.44109L0.469686 18.2979C-0.125975 19.2578 -0.156408 20.4237 0.386039 21.4156C0.929754 22.4074 1.92465 23 3.04755 23H23.952C25.0748 23 26.0697 22.4074 26.6135 21.4156C27.1572 20.4237 27.1255 19.2578 26.5298 18.2979ZM13.4999 19.9284C12.6596 19.9284 11.979 19.2411 11.979 18.3926C11.979 17.5441 12.6596 16.8568 13.4999 16.8568C14.3401 16.8568 15.0207 17.5441 15.0207 18.3926C15.0207 19.2411 14.3401 19.9284 13.4999 19.9284ZM14.6887 14.1845C14.6532 14.8219 14.131 15.3211 13.4999 15.3211C12.8687 15.3211 12.3465 14.8219 12.311 14.1845L11.9042 6.78576C11.8535 5.86044 12.5822 5.08229 13.4999 5.08229C14.4175 5.08229 15.1474 5.86044 15.0955 6.78576L14.6887 14.1845Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="array-home-plan-state-header-text">
                        {card.type === 'in-progress' ? 'PLAN IN PROGRESS' : 'ANSWER A FEW QUESTIONS'}
                      </span>
                    </header>
                    <div className="array-home-plan-state-body">
                      <h3 className="array-home-plan-state-title">{card.title}</h3>
                      <div className="array-home-plan-state-icon-box">
                        <img src={card.iconSrc} alt="" aria-hidden="true" className="array-home-plan-state-illustration" />
                      </div>
                      <p className="array-home-plan-state-description">{card.description}</p>
                    </div>
                  </>
                )}
              </article>
            ))}
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
                  <span className="array-home-chip-label">{suggestion}</span>
                  <span className="array-home-chip-tooltip">{suggestion}</span>
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

      <div
        id="signin-panel-container"
        className={`array-home-signin-panel-container ${signinOpen ? 'is-open' : ''}`}
        aria-hidden={!signinOpen}
      >
        <div id="signin-panel-backdrop" className="array-home-signin-panel-backdrop" onClick={() => setSigninOpen(false)} />
        <aside id="signin-panel" className="array-home-signin-panel">
          <button
            id="close-signin-panel"
            type="button"
            className="array-home-close-signin-panel"
            onClick={() => setSigninOpen(false)}
            aria-label="Close sign in panel"
          >
            ✕
          </button>
          <h2 className="array-home-signin-title">Log In</h2>
          <div className="array-home-signin-content">
            <form id="signin-form" className="array-home-signin-form" onSubmit={handleSigninSubmit}>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={signinEmail}
                onChange={(event) => setSigninEmail(event.target.value)}
                className="array-home-signin-input"
              />
              <button className="array-home-signin-submit" type="submit">
                Send Log In Link
              </button>
            </form>
          </div>
          <p className="array-home-signin-legal">
            By signing in, you acknowledge that you understand and agree to the{' '}
            <a href="#" className="array-home-signin-link">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="array-home-signin-link">
              Privacy Policy
            </a>
            .
          </p>
        </aside>
      </div>

      <div
        id="aside-panel-container"
        className={`array-home-profile-panel-container ${profileOpen ? 'is-open' : ''}`}
        aria-hidden={!profileOpen}
      >
        <div id="plan-panel-backdrop" className="array-home-profile-panel-backdrop" onClick={() => setProfileOpen(false)} />
        <aside id="plan-panel" className="array-home-profile-panel">
          <div className="array-home-profile-panel-header">
            <button
              type="button"
              id="close-plan-panel"
              className="array-home-profile-panel-close"
              onClick={() => setProfileOpen(false)}
            >
              ✕
            </button>
            <div className="array-home-profile-panel-header-content"></div>
            <div className="array-home-profile-panel-header-actions">
              <a href="#" className="array-home-profile-logout-link" onClick={handleLogout}>
                Log out
              </a>
            </div>
          </div>

          <div id="modal-body" className="array-home-profile-panel-body">
            <div id="user-profile-component" className="array-home-profile-content">
              <section className="array-home-profile-section-wrapper">
                <h2 className="array-home-profile-section-title">Update Profile</h2>
                <hr className="array-home-profile-section-hr" />
                <div className="array-home-profile-form-grid">
                  <div className="array-home-profile-avatar-block">
                    <div className="array-home-profile-avatar-upload-circle">
                      <img src="/svg/upload.svg" alt="Upload avatar" />
                    </div>
                  </div>
                  <div className="array-home-profile-input-group">
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                  </div>
                  <div className="array-home-profile-input-group">
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                  </div>
                  <div className="array-home-profile-input-group array-home-profile-input-group-full">
                    <label>Email Address</label>
                    <input type="email" value={profileEmail} onChange={(event) => setProfileEmail(event.target.value)} />
                  </div>
                  <div className="array-home-profile-actions-row">
                    <button type="button" className="array-home-profile-primary-btn">
                      Save Profile
                    </button>
                  </div>
                </div>
              </section>

              <section className="array-home-profile-section-wrapper">
                <h2 className="array-home-profile-section-title">Change Password</h2>
                <hr className="array-home-profile-section-hr" />
                <div className="array-home-profile-form-grid array-home-profile-password-grid">
                  <div className="array-home-profile-input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder=" "
                    />
                  </div>
                  <div className="array-home-profile-input-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder=" "
                    />
                  </div>
                  <div className="array-home-profile-actions-row">
                    <button type="button" className="array-home-profile-primary-btn">
                      Update Password
                    </button>
                  </div>
                </div>
              </section>

              <section className="array-home-profile-section-wrapper">
                <h2 className="array-home-profile-section-title">Integrations</h2>
                <hr className="array-home-profile-section-hr" />
                <div className="array-home-profile-integrations-list">
                  <div className="array-home-profile-integration-item">
                    <div>
                      <h3 className="array-home-profile-integration-name">Google Calendar</h3>
                      <p className="array-home-profile-integration-description">
                        Connect Google to sync calendars, documents, and tasks seamlessly into your plans.
                      </p>
                    </div>
                    <div className="array-home-profile-integration-actions">
                      <a href="#" className="array-home-profile-integration-link">
                        <img src="/images/integrations/google-icon.png" width={30} alt="Authorize" />
                        Authorize
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

