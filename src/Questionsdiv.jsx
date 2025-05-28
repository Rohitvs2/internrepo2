import React, { useState, useEffect } from "react";
import Questionscount from './Questionscount';

function Questionsdiv({ onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [questionsReview, setQuestionsReview] = useState(0)
  const [reviewQuestions, setReviewQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 1 minute in seconds
  const [hideQuestionCount, setHideQuestionCount] = useState(false);

const questions = [
  {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { answerText: 'London', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Berlin', isCorrect: false },
      { answerText: 'Madrid', isCorrect: false },
    ],
    explanation: 'Paris is the capital and largest city of France, known for its art, fashion, and culture.'
  },
  {
    questionText: 'Which planet is known as the Red Planet?',
    answerOptions: [
      { answerText: 'Earth', isCorrect: false },
      { answerText: 'Mars', isCorrect: true },
      { answerText: 'Jupiter', isCorrect: false },
      { answerText: 'Venus', isCorrect: false },
    ],
    explanation: 'Mars is called the Red Planet because of its reddish appearance caused by iron oxide (rust) on its surface.'
  },
  {
    questionText: 'Who wrote "Hamlet"?',
    answerOptions: [
      { answerText: 'Charles Dickens', isCorrect: false },
      { answerText: 'William Shakespeare', isCorrect: true },
      { answerText: 'Mark Twain', isCorrect: false },
      { answerText: 'Jane Austen', isCorrect: false },
    ],
    explanation: '"Hamlet" is one of the most famous plays written by William Shakespeare.'
  },
  {
    questionText: 'What is the boiling point of water?',
    answerOptions: [
      { answerText: '100°C', isCorrect: true },
      { answerText: '0°C', isCorrect: false },
      { answerText: '50°C', isCorrect: false },
      { answerText: '212°C', isCorrect: false },
    ],
    explanation: 'Water boils at 100°C (212°F) at standard atmospheric pressure (sea level).'
  },
  {
    questionText: 'Which gas do plants use for photosynthesis?',
    answerOptions: [
      { answerText: 'Oxygen', isCorrect: false },
      { answerText: 'Carbon Dioxide', isCorrect: true },
      { answerText: 'Nitrogen', isCorrect: false },
      { answerText: 'Hydrogen', isCorrect: false },
    ],
    explanation: 'Plants absorb carbon dioxide from the air and use sunlight to convert it into glucose during photosynthesis.'
  },
  {
    questionText: 'What is the largest mammal in the world?',
    answerOptions: [
      { answerText: 'Elephant', isCorrect: false },
      { answerText: 'Blue Whale', isCorrect: true },
      { answerText: 'Giraffe', isCorrect: false },
      { answerText: 'Hippopotamus', isCorrect: false },
    ],
    explanation: 'The blue whale is the largest known animal to have ever existed, weighing up to 200 tons.'
  },
  {
    questionText: 'What is the square root of 64?',
    answerOptions: [
      { answerText: '6', isCorrect: false },
      { answerText: '8', isCorrect: true },
      { answerText: '7', isCorrect: false },
      { answerText: '9', isCorrect: false },
    ],
    explanation: '8 × 8 = 64, so the square root of 64 is 8.'
  },
  {
    questionText: 'Which language is primarily spoken in Brazil?',
    answerOptions: [
      { answerText: 'Spanish', isCorrect: false },
      { answerText: 'Portuguese', isCorrect: true },
      { answerText: 'French', isCorrect: false },
      { answerText: 'English', isCorrect: false },
    ],
    explanation: 'Brazil was colonized by Portugal, so Portuguese is the official and most widely spoken language.'
  },
  {
    questionText: 'Who painted the Mona Lisa?',
    answerOptions: [
      { answerText: 'Michelangelo', isCorrect: false },
      { answerText: 'Leonardo da Vinci', isCorrect: true },
      { answerText: 'Pablo Picasso', isCorrect: false },
      { answerText: 'Vincent van Gogh', isCorrect: false },
    ],
    explanation: 'Leonardo da Vinci painted the Mona Lisa during the Renaissance. It is now displayed in the Louvre in Paris.'
  },
  {
    questionText: 'What is the smallest prime number?',
    answerOptions: [
      { answerText: '1', isCorrect: false },
      { answerText: '2', isCorrect: true },
      { answerText: '3', isCorrect: false },
      { answerText: '5', isCorrect: false },
    ],
    explanation: '2 is the smallest and only even prime number. A prime number has only two divisors: 1 and itself.'
  },
];

  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [showScore, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerClick = (isCorrect, index) => {
    if (submitted) return; // Prevent changes after submission
    
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: { index, isCorrect }
    });
    
    if (isCorrect) setScore(score + 1);
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Loop back to first question
      setCurrentQuestion(0)
    }
  }

  const handleSubmit = () => {
    setShowScore(true);
    setSubmitted(true);
    setHideQuestionCount(true);
  }

  const handleReviewClick = () => {
    if (!reviewQuestions.includes(currentQuestion)) {
      setReviewQuestions([...reviewQuestions, currentQuestion])
    }
  }

  const handleRetake = () => {
    onReset(); // Call parent reset function instead of local state reset
  }

  return (
    <div className={`quiz-layout ${showSummary ? 'justify-center' : ''}`}>
      <div className={`quiz-container ${showSummary ? 'w-full max-w-6xl transition-all duration-300' : ''}`}>
        {showScore ? (
          <div className='score-section flex flex-col items-center gap-4'>
            <div className="text-3xl font-bold mb-4">
              {score === questions.length ? '🎉 Perfect Score! 🎉' : 
               score >= questions.length * 0.7 ? '🌟 Great Job! 🌟' :
               score >= questions.length * 0.5 ? '👍 Good Effort! 👍' : 
               '📚 Keep Learning! 📚'}
            </div>
            <div className="text-2xl font-bold text-blue-600">
              You scored {score} out of {questions.length}
            </div>
            <div className="flex gap-4">
              <button 
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleRetake}
              >
                Retake Quiz
              </button>
              <button 
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => {
                  setShowSummary(!showSummary);
                  setHideQuestionCount(true);
                }}
              >
                {showSummary ? 'Hide Summary' : 'Show Summary'}
              </button>
            </div>

            {showSummary && (
              <div className="summary-container mt-4">
                {questions.map((question, qIndex) => (
                  <div key={qIndex} className="border-b py-2">
                    <div className="font-semibold">
                      {qIndex + 1}. {question.questionText}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-1">
                      {question.answerOptions.map((option, index) => {
                        const isSelected = selectedAnswers[qIndex]?.index === index;
                        const isCorrect = option.isCorrect;
                        const isWrong = submitted && isSelected && !isCorrect;
                        const isRight = submitted && isCorrect;

                        return (
                          <div
                            key={index}
                            className={`
                              p-2 rounded-lg flex-1
                              ${isRight ? 'bg-green-100' : ''}
                              ${isWrong ? 'bg-red-100' : ''}
                            `}
                          >
                            {option.answerText}
                            {isRight && <span className="text-green-500 ml-2">✓</span>}
                            {isWrong && <span className="text-red-500 ml-2">✗</span>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {question.explanation}
                    </div>
                  </div>
                ))} 
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="text-xl font-bold text-red-500 mb-4">
              Time Remaining: {formatTime(timeLeft)}
            </div>
            <div className='question-section'>
              <div className='question-count'>
                Question {currentQuestion + 1}/{questions.length}
              </div>
              <div className='question-text'>
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className='answer-section'>
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswerClick(answerOption.isCorrect, index)}
                  className={`
                    font-semibold p-2 rounded-lg mb-2 w-full
                    ${selectedAnswers[currentQuestion]?.index === index 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-blue-600 text-white'}
                    ${submitted && selectedAnswers[currentQuestion]?.index === index 
                      ? (answerOption.isCorrect ? 'bg-green-500' : 'bg-red-500') 
                      : ''}
                    transition-all duration-300 transform hover:scale-105
                  `}
                  disabled={submitted}
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </div>
            <div className="mt-4 flex justify-center">
            
            </div>
            <button 
              className="p-2 rounded-lg text-l bg-yellow-300 hover:bg-yellow-600"
              onClick={handleReviewClick}
            >
              review later
            </button>
          </>
        )}
      </div>
      {!hideQuestionCount && (
        <Questionscount 
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          answeredQuestions={answeredQuestions}
          setCurrentQuestion={setCurrentQuestion}
          reviewQuestions={reviewQuestions}
          onSubmit={handleSubmit}  // Add this prop
        />
      )}
    </div>
  )
}
export default Questionsdiv;