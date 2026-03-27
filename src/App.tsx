import { useState } from 'react'
import { ArrayHtmlApp } from './arrayHtml/ArrayHtmlApp'
import { HomePage } from './home/HomePage'

const App = () => {
  const [view, setView] = useState<'home' | 'flow'>('home')

  const handleStartFlow = () => {
    setView('flow')
  }

  if (view === 'home') {
    return <HomePage onSearch={handleStartFlow} />
  }

  return <ArrayHtmlApp />
}

export default App
