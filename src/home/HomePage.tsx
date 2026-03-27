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

