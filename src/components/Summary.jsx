import React, { useState } from 'react';
import Chatbot from '../Chatbox';

function Summary({ questions, selectedAnswers, onClose }) {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-black bg-opacity-95 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gray-50 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Quiz Summary</h2>
            <p className="text-gray-600">Your performance overview</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              {showChat ? 'Hide AI Assistant' : 'Get AI Help'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Questions Review */}
          <div className={`${showChat ? 'w-2/3' : 'w-full'} transition-all duration-300 overflow-y-auto p-6`}>
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-white rounded-lg p-4 border hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                      {qIndex + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{question.questionText}</h3>
                      <div className="ml-4 space-y-2">
                        <div className="flex items-center">
                          <span className="text-gray-600">Your answer: </span>
                          <span
                            className={`ml-2 px-3 py-1 rounded-full ${
                              selectedAnswers[qIndex]?.isCorrect
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {question.answerOptions[selectedAnswers[qIndex]?.index]?.answerText || 'Not answered'}
                          </span>
                        </div>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded italic text-sm">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chatbot */}
          {showChat && (
            <div className="w-1/3 border-l">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-semibold">AI Learning Assistant</h3>
                <p className="text-sm text-gray-600">Ask questions about your quiz results</p>
              </div>
              <div className="h-[calc(90vh-10rem)]">
                <Chatbot />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
