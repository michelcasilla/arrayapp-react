import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { CounterButton } from './components/shared/CounterButton'
import { Hero } from './components/shared/Hero'
import { NextSteps } from './components/shared/NextSteps'
import { Spacer } from './components/shared/Spacer'
import { Ticks } from './components/shared/Ticks'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <Hero
          hero={{ src: heroImg, className: 'base', width: 170, height: 179, alt: '' }}
          frameworkLogo={{ src: reactLogo, className: 'framework', alt: 'React logo' }}
          toolLogo={{ src: viteLogo, className: 'vite', alt: 'Vite logo' }}
        />
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <CounterButton count={count} onIncrement={() => setCount((count) => count + 1)} />
      </section>

      <Ticks />

      <NextSteps viteLogoSrc={viteLogo} reactLogoSrc={reactLogo} />

      <Ticks />
      <Spacer />
    </>
  )
}

export default App
