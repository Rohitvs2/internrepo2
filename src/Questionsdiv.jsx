import React, { useState, useEffect } from "react";
import Questionscount from './Questionscount';
import Chatbot from "./Chatbox";

function Questionsdiv({ onReset, questions, setShowChat }) {
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
      {/* Only show Chatbot after submission */}
      {submitted && <Chatbot/>}
    </div>
  )
}
export default Questionsdiv;