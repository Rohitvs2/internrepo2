import React from 'react';
import './Questionscount.css';

function Questionscount({ totalQuestions, currentQuestion, answeredQuestions, setCurrentQuestion, reviewQuestions, onSubmit }) {
 

 
  const generateQuestionButtons = () => {
    return Array.from({ length: totalQuestions }, (_, index) => (
      <button
        key={index + 1}
        className={`question-button ${currentQuestion === index ? 'active' : ''} 
                   ${answeredQuestions.includes(index) ? 'answered' : ''}
                   ${reviewQuestions.includes(index) ? 'review' : ''}`}
        onClick={() => setCurrentQuestion(index)}
      >
        {index + 1}
      </button>
    ));
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the exam?')) {
      onSubmit(); // This will now call the handleSubmit from parent
    }
  };

  return (
    <div className="questions-panel ">
      <div className="directions">
        <h2>Directions</h2>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{totalQuestions}</span>
            <span>Total Questions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{answeredQuestions.length}</span>
            <span>Answered Questions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{reviewQuestions.length}</span>
            <span>Questions to be Reviewed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalQuestions - answeredQuestions.length}</span>
            <span>Un-Answered Questions</span>
          </div>
        </div>

        <div className="all-questions">
          <h3>All Questions</h3>
          <div className="question-grid">
            {generateQuestionButtons()}
          </div>
        </div>

        <button 
          className="submit-exam" 
          onClick={handleSubmit}
          title={`${answeredQuestions.length < totalQuestions ? 'Some questions are unanswered!' : 'Submit your answers'}`}
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}

export default Questionscount;
