import { useState } from 'react'
import Questionsdiv from './Questionsdiv'
import LandingPage from './LandingPage'
import './App.css'

function App() {
  const [quizStarted, setQuizStarted] = useState(false)

  const handleQuizReset = () => {
    setQuizStarted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      {!quizStarted ? (
        <LandingPage onStartQuiz={() => setQuizStarted(true)} />
      ) : (
        <Questionsdiv onReset={handleQuizReset} />
      )}
    </div>
  )
}

export default App
