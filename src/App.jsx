import { useState } from 'react'
import Questionsdiv from './Questionsdiv'
import LandingPage from './LandingPage'
import './App.css'
import Chatbot from './Chatbox'
import { useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';

function App() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const { user } = useAuth();

const [questions, setQuestions] = useState([
  {
    questionNumber: 1,
    questionText: 'What is the largest ocean on Earth?',
    answerOptions: [
      { answerText: 'Atlantic Ocean', isCorrect: false },
      { answerText: 'Indian Ocean', isCorrect: false },
      { answerText: 'Arctic Ocean', isCorrect: false },
      { answerText: 'Pacific Ocean', isCorrect: true },
    ],
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.'
  },
  {
    questionNumber: 2,
    questionText: 'Who wrote the play "Romeo and Juliet"?',
    answerOptions: [
      { answerText: 'William Shakespeare', isCorrect: true },
      { answerText: 'Mark Twain', isCorrect: false },
      { answerText: 'Jane Austen', isCorrect: false },
      { answerText: 'Charles Dickens', isCorrect: false },
    ],
    explanation: 'William Shakespeare wrote "Romeo and Juliet" in the late 16th century.'
  },
  {
    questionNumber: 3,
    questionText: 'What is the boiling point of water at sea level?',
    answerOptions: [
      { answerText: '90°C', isCorrect: false },
      { answerText: '100°C', isCorrect: true },
      { answerText: '110°C', isCorrect: false },
      { answerText: '120°C', isCorrect: false },
    ],
    explanation: 'At sea level, water boils at 100°C (212°F).'
  },
  {
    questionNumber: 4,
    questionText: 'Which gas do plants absorb from the atmosphere?',
    answerOptions: [
      { answerText: 'Oxygen', isCorrect: false },
      { answerText: 'Carbon Dioxide', isCorrect: true },
      { answerText: 'Nitrogen', isCorrect: false },
      { answerText: 'Hydrogen', isCorrect: false },
    ],
    explanation: 'Plants absorb carbon dioxide for photosynthesis.'
  },
  {
    questionNumber: 5,
    questionText: 'What is the hardest natural substance on Earth?',
    answerOptions: [
      { answerText: 'Gold', isCorrect: false },
      { answerText: 'Iron', isCorrect: false },
      { answerText: 'Diamond', isCorrect: true },
      { answerText: 'Quartz', isCorrect: false },
    ],
    explanation: 'Diamond is the hardest known natural substance.'
  },
  {
    questionNumber: 6,
    questionText: 'Which country is known as the Land of the Rising Sun?',
    answerOptions: [
      { answerText: 'China', isCorrect: false },
      { answerText: 'South Korea', isCorrect: false },
      { answerText: 'Thailand', isCorrect: false },
      { answerText: 'Japan', isCorrect: true },
    ],
    explanation: 'Japan is called the Land of the Rising Sun due to its eastern position relative to Asia.'
  },
  {
    questionNumber: 7,
    questionText: 'What is the main language spoken in Brazil?',
    answerOptions: [
      { answerText: 'Spanish', isCorrect: false },
      { answerText: 'Portuguese', isCorrect: true },
      { answerText: 'English', isCorrect: false },
      { answerText: 'French', isCorrect: false },
    ],
    explanation: 'Portuguese is the official and most widely spoken language in Brazil.'
  },
  {
    questionNumber: 8,
    questionText: 'What organ in the human body is responsible for pumping blood?',
    answerOptions: [
      { answerText: 'Lungs', isCorrect: false },
      { answerText: 'Brain', isCorrect: false },
      { answerText: 'Heart', isCorrect: true },
      { answerText: 'Liver', isCorrect: false },
    ],
    explanation: 'The heart pumps blood throughout the body, supplying oxygen and nutrients.'
  },
  {
    questionNumber: 9,
    questionText: 'Which element has the chemical symbol "O"?',
    answerOptions: [
      { answerText: 'Osmium', isCorrect: false },
      { answerText: 'Oxygen', isCorrect: true },
      { answerText: 'Gold', isCorrect: false },
      { answerText: 'Oganesson', isCorrect: false },
    ],
    explanation: 'The chemical symbol "O" stands for Oxygen.'
  },
  {
    questionNumber: 10,
    questionText: 'In which continent is the Sahara Desert located?',
    answerOptions: [
      { answerText: 'Asia', isCorrect: false },
      { answerText: 'Africa', isCorrect: true },
      { answerText: 'Australia', isCorrect: false },
      { answerText: 'South America', isCorrect: false },
    ],
    explanation: 'The Sahara Desert is located in Northern Africa.'
  }
]);


  const handleQuizReset = () => {
    setQuizStarted(false)
    setQuizCompleted(false)
    setShowChat(false)
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
  }

  const toggleChat = () => {
    setShowChat(!showChat)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!quizStarted ? (
          <LandingPage onStartQuiz={() => setQuizStarted(true)} />
        ) : (
          <div className={`grid gap-6 transition-all duration-300 ${showChat && quizCompleted ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>
            {/* Quiz Section */}
            <div className={`${showChat && quizCompleted ? 'lg:col-span-2' : 'col-span-1'}`}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                <Questionsdiv 
                  onReset={handleQuizReset} 
                  questions={questions} 
                  onComplete={handleQuizComplete}
                  setShowChat={setShowChat}
                  isLoggedIn={!!user}
                />
              </div>
            </div>
            
            {/* Chatbot Section */}
            {showChat && quizCompleted && questions.length > 0 && (
  <>
    {console.log('Questions passed to Chatbot:', questions)}
    <div className="lg:col-span-1">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden h-full min-h-[600px]">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white">AI Assistant</h3>
                <p className="text-purple-100 text-sm">Ask about your quiz results</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="h-full bg-white/5 backdrop-blur-sm">
          <Chatbot questions={questions} />
        </div>
      </div>
    </div>
  </>
)}

          </div>
        )}
      </main>

      {/* Mobile Chat Toggle */}
      {quizCompleted && (
        <button
          onClick={toggleChat}
          className={`fixed bottom-6 right-6 lg:hidden z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${showChat ? 'rotate-45' : 'rotate-0'}`}
        >
          {showChat ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      )}

      {/* Mobile Chat Overlay */}
      {showChat && quizCompleted && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowChat(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-white/95 rounded-t-2xl border-t border-white/20 shadow-2xl">
            {/* Mobile Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">AI Assistant</h3>
                    <p className="text-purple-100 text-sm">Ask about your quiz results</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobile Chat Content */}
            <div className="h-full bg-white/5 backdrop-blur-sm overflow-hidden">
              <Chatbot questions={questions} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App