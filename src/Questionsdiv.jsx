import React, { useState, useEffect } from "react";
import Questionscount from './Questionscount';
import Chatbot from "./Chatbox";
import Login from "./Login";
import { GoogleOAuthProvider } from '@react-oauth/google';

function Questionsdiv({ onReset, questions, setShowChat, isLoggedIn = false }) {
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
  const [modalOpen, setModalOpen] = useState(false);

  // Determine available questions based on login status
  const freeQuestionsLimit = 4;
  const availableQuestions = isLoggedIn ? questions : questions.slice(0, freeQuestionsLimit);
  const totalQuestions = questions.length;
  const lockedQuestionsCount = totalQuestions - freeQuestionsLimit;

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

  // Only show chatbot after submission (when submitted is true)
  useEffect(() => {
    if (submitted) {
      setShowChat && setShowChat(true);
    } else {
      setShowChat && setShowChat(false);
    }
  }, [submitted, setShowChat]);

  // Reset to first question if current question exceeds available questions
  useEffect(() => {
    if (currentQuestion >= availableQuestions.length) {
      setCurrentQuestion(0);
    }
  }, [currentQuestion, availableQuestions.length]);

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
    if (currentQuestion < availableQuestions.length - 1) {
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

  // Fix: Open modal on login button click
  const handleLoginRedirect = () => {
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={`quiz-layout ${showSummary ? 'justify-center' : ''}`}>
      <div className={`quiz-container ${showSummary ? 'w-full max-w-6xl transition-all duration-300' : ''}`}>
        {/* Login Status Banner */}
        {!isLoggedIn && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Free Preview Mode</p>
                <p className="text-sm">You can access {freeQuestionsLimit} out of {totalQuestions} questions. {lockedQuestionsCount} questions are locked.</p>
              </div>
              <button 
                onClick={handleLoginRedirect}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Login to Unlock All
              </button>
              {/* Login Modal */}
              {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white w-144 p-6 rounded shadow-lg relative">
                    <button
                      onClick={toggleModal}
                      className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                    >
                      &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4  text-orange-600 ">Welcome Back </h2>
                    <div>
                      <h2 className="text-lg font-bold mb-4  text-orange-600 ">Login</h2>
                      <p className='text-blue-600 font-semibold'> Learn without limits - start, switch, or advance your career!</p>
                      <GoogleOAuthProvider clientId="795032530307-o0oimpaienc639tmu0gl5v35aaks1es7.apps.googleusercontent.com">
                        <Login onClose={toggleModal} className="w-56"></Login>
                      </GoogleOAuthProvider>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {showScore ? (
          <div className='score-section flex flex-col items-center gap-4'>
            <div className="text-3xl font-bold mb-4">
              {score === availableQuestions.length ? '🎉 Perfect Score! 🎉' : 
               score >= availableQuestions.length * 0.7 ? '🌟 Great Job! 🌟' :
               score >= availableQuestions.length * 0.5 ? '👍 Good Effort! 👍' : 
               '📚 Keep Learning! 📚'}
            </div>
            <div className="text-2xl font-bold text-blue-600">
              You scored {score} out of {availableQuestions.length}
              {!isLoggedIn && (
                <div className="text-sm text-gray-600 mt-2">
                  (Free preview: {freeQuestionsLimit} questions completed)
                </div>
              )}
            </div>
            
            {!isLoggedIn && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-800 font-semibold mb-2">Want to access all {totalQuestions} questions?</p>
                <button 
                  onClick={handleLoginRedirect}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Login to Unlock Full Quiz
                </button>
              </div>
            )}

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
                {availableQuestions.map((question, qIndex) => (
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
                
                {/* Show locked questions in summary */}
                {!isLoggedIn && questions.slice(freeQuestionsLimit).map((question, qIndex) => (
                  <div key={qIndex + freeQuestionsLimit} className="border-b py-2 relative">
                    <div className="absolute inset-0 bg-gray-200 bg-opacity-75 rounded-lg flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <p className="font-semibold text-gray-700">Content Locked</p>
                        <button 
                          onClick={handleLoginRedirect}
                          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Login to Unlock
                        </button>
                      </div>
                    </div>
                    <div className="font-semibold blur-sm">
                      {qIndex + freeQuestionsLimit + 1}. {question.questionText}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-1 blur-sm">
                      {question.answerOptions.map((option, index) => (
                        <div key={index} className="p-2 rounded-lg flex-1 bg-gray-100">
                          {option.answerText}
                        </div>
                      ))}
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
                Question {currentQuestion + 1}/{availableQuestions.length}
                {!isLoggedIn && (
                  <span className="text-sm text-gray-500 ml-2">
                    (Free Preview)
                  </span>
                )}
              </div>
              <div className='question-text'>
                {availableQuestions[currentQuestion].questionText}
              </div>
            </div>
            <div className='answer-section'>
              {availableQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
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

            {/* Locked Questions Preview */}
            {!isLoggedIn && currentQuestion === availableQuestions.length - 1 && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-bold text-gray-700 mb-2">
                    {lockedQuestionsCount} More Questions Available
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Unlock the remaining questions to get the complete learning experience
                  </p>
                  <button 
                    onClick={handleLoginRedirect}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Login to Access All Questions
                  </button>
                </div>
              </div>
            )}

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
          totalQuestions={availableQuestions.length}
          currentQuestion={currentQuestion}
          answeredQuestions={answeredQuestions}
          setCurrentQuestion={setCurrentQuestion}
          reviewQuestions={reviewQuestions}
          onSubmit={handleSubmit}
          isLoggedIn={isLoggedIn}
          totalQuestionsCount={totalQuestions}
        />
      )}
      {/* Only show Chatbot after submission */}
      {submitted && <Chatbot/>}
    </div>
  )
}
export default Questionsdiv;