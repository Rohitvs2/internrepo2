import React from 'react';

function Questionscount({ 
  totalQuestions, 
  currentQuestion, 
  answeredQuestions, 
  setCurrentQuestion, 
  reviewQuestions, 
  onSubmit 
}) {
  const generateQuestionButtons = () => {
    return Array.from({ length: totalQuestions }, (_, index) => {
      const isActive = currentQuestion === index;
      const isAnswered = answeredQuestions.includes(index);
      const isReview = reviewQuestions.includes(index);
      
      let buttonClasses = "w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 border-2 ";
      
      if (isActive) {
        buttonClasses += "bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-300 ";
      } else if (isReview) {
        buttonClasses += "bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 ";
      } else if (isAnswered) {
        buttonClasses += "bg-green-500 text-white border-green-500 hover:bg-green-600 ";
      } else {
        buttonClasses += "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 ";
      }
      
      return (
        <button
          key={index + 1}
          className={buttonClasses}
          onClick={() => setCurrentQuestion(index)}
          title={`Question ${index + 1} - ${isAnswered ? 'Answered' : 'Not answered'}${isReview ? ' (Marked for review)' : ''}`}
        >
          {index + 1}
        </button>
      );
    });
  };

  const handleSubmit = () => {
    const unansweredCount = totalQuestions - answeredQuestions.length;
    const message = unansweredCount > 0 
      ? `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`
      : 'Are you sure you want to submit your exam?';
      
    if (window.confirm(message)) {
      onSubmit();
    }
  };

  const unansweredCount = totalQuestions - answeredQuestions.length;
  const completionPercentage = Math.round((answeredQuestions.length / totalQuestions) * 100);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Quiz Overview
        </h2>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{completionPercentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{totalQuestions}</div>
          <div className="text-sm text-blue-600 font-medium">Total Questions</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
          <div className="text-2xl font-bold text-green-700">{answeredQuestions.length}</div>
          <div className="text-sm text-green-600 font-medium">Answered</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 text-center border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">{reviewQuestions.length}</div>
          <div className="text-sm text-yellow-600 font-medium">For Review</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 text-center border border-red-200">
          <div className="text-2xl font-bold text-red-700">{unansweredCount}</div>
          <div className="text-sm text-red-600 font-medium">Unanswered</div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          Question Navigation
        </h3>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-gray-600">Current</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Answered</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">Review</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
            <span className="text-gray-600">Unanswered</span>
          </div>
        </div>
        
        {/* Question Grid */}
        <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-lg border">
          {generateQuestionButtons()}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-auto">
        <button 
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            unansweredCount > 0 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
          } hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none`}
          onClick={handleSubmit}
          title={unansweredCount > 0 ? `${unansweredCount} questions remaining!` : 'Submit your answers'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {unansweredCount > 0 ? `Submit (${unansweredCount} remaining)` : 'Submit Exam'}
        </button>
        
        {unansweredCount > 0 && (
          <p className="text-center text-orange-600 text-sm mt-2 font-medium">
            ⚠️ You have unanswered questions
          </p>
        )}
      </div>
    </div>
  );
}

export default Questionscount;