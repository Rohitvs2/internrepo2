import React from 'react';

function Summary({ questions, selectedAnswers, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Quiz Summary</h2>
        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="border-b pb-4">
              <p className="font-semibold mb-2">
                {qIndex + 1}. {question.questionText}
              </p>
              <div className="ml-4">
                <p className="mb-2">
                  Your answer: 
                  <span className={`ml-2 font-medium ${
                    selectedAnswers[qIndex]?.isCorrect 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {question.answerOptions[selectedAnswers[qIndex]?.index]?.answerText || 'Not answered'}
                  </span>
                </p>
                
                <p className="text-gray-600 italic">{question.explanation}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Close Summary
        </button>
      </div>
    </div>
  );
}

export default Summary;
