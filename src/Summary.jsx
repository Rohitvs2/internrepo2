import React, { useMemo } from 'react';
import Chatbot from '../Chatbox';

function Summary({ questions, selectedAnswers, onClose }) {
  // Calculate quiz statistics
  const stats = useMemo(() => {
    const totalQuestions = questions.length;
    const correctAnswers = selectedAnswers.filter(answer => answer?.isCorrect).length;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const unanswered = selectedAnswers.filter(answer => !answer || answer.index === undefined).length;
    
    return {
      total: totalQuestions,
      correct: correctAnswers,
      incorrect: totalQuestions - correctAnswers - unanswered,
      unanswered,
      percentage
    };
  }, [questions, selectedAnswers]);

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Excellent work! 🎉";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 70) return "Good effort! 👍";
    if (percentage >= 60) return "Keep practicing! 📚";
    return "More study needed! 💪";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-[95vh] gap-6">
        {/* Main Summary Content (white box) */}
        <div className="bg-white rounded-2xl shadow-2xl flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"></div>
            <div className="relative p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
                  <p className="text-blue-100 text-lg">Review your performance below</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-opacity-30 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">{stats.percentage}%</div>
                  <div className="text-sm text-blue-100">Overall Score</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-300">{stats.correct}</div>
                  <div className="text-sm text-blue-100">Correct</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-red-300">{stats.incorrect}</div>
                  <div className="text-sm text-blue-100">Incorrect</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-gray-300">{stats.unanswered}</div>
                  <div className="text-sm text-blue-100">Unanswered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Message */}
          <div className={`mx-6 mt-4 p-4 rounded-xl border-2 ${getScoreColor(stats.percentage)}`}>
            <div className="text-center">
              <span className="text-2xl font-bold">{getPerformanceMessage(stats.percentage)}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 mt-4">
            {/* Questions Review */}
            <div className="space-y-4">
              {questions.map((question, qIndex) => {
                const userAnswer = selectedAnswers[qIndex];
                const isCorrect = userAnswer?.isCorrect;
                const isAnswered = userAnswer && userAnswer.index !== undefined;
                
                return (
                  <div
                    key={qIndex}
                    className={`bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg ${
                      !isAnswered 
                        ? 'border-gray-200 bg-gray-50' 
                        : isCorrect 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Question Number with Status */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        !isAnswered 
                          ? 'bg-gray-200 text-gray-600' 
                          : isCorrect 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                      }`}>
                        {!isAnswered ? '?' : isCorrect ? '✓' : '✗'}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Question */}
                        <h3 className="font-semibold text-xl mb-4 text-gray-800 leading-relaxed">
                          {question.questionText}
                        </h3>
                        
                        {/* Answer Options */}
                        <div className="space-y-3 mb-4">
                          {question.answerOptions.map((option, optIndex) => {
                            const isSelected = userAnswer?.index === optIndex;
                            const isCorrectOption = option.isCorrect;
                            
                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                  isSelected && isCorrectOption
                                    ? 'border-green-400 bg-green-100'
                                    : isSelected && !isCorrectOption
                                      ? 'border-red-400 bg-red-100'
                                      : isCorrectOption
                                        ? 'border-green-300 bg-green-50'
                                        : 'border-gray-200 bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                                    isSelected && isCorrectOption
                                      ? 'bg-green-500 text-white'
                                      : isSelected && !isCorrectOption
                                        ? 'bg-red-500 text-white'
                                        : isCorrectOption
                                          ? 'bg-green-400 text-white'
                                          : 'bg-gray-300 text-gray-600'
                                  }`}>
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span className="text-gray-800">{option.answerText}</span>
                                  {isSelected && (
                                    <span className="ml-auto text-sm font-medium text-blue-600">
                                      Your Choice
                                    </span>
                                  )}
                                  {isCorrectOption && (
                                    <span className="ml-auto text-sm font-medium text-green-600">
                                      Correct Answer
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Explanation */}
                        {question.explanation && (
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="font-semibold text-blue-800">Explanation</span>
                            </div>
                            <p className="text-blue-700 leading-relaxed">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chatbot OUTSIDE the white box, always visible */}
        <div className="flex flex-col w-full md:w-[400px] min-w-[320px] max-w-[100vw] h-full">
          <div className="rounded-2xl shadow-2xl bg-gradient-to-b from-white/90 to-blue-50 border border-blue-200 flex flex-col h-full">
            <div className="p-6 border-b bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-tr-2xl rounded-tl-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Learning Assistant</h3>
                  <p className="text-purple-100 text-xs">Get personalized help with your quiz results</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-white overflow-hidden rounded-b-2xl">
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;