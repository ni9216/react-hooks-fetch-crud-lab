import React from 'react';

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE',
    })
      .then(() => onDeleteQuestion(question));
  }

  function handleAnswerChange(e) {
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(e.target.value),
    };

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedData) => onUpdateQuestion(updatedData));
  }

  return (
    <li>
      <h4>{question.prompt}</h4>
      <label>
        Correct Answer:
        <select
          defaultValue={question.correctIndex}
          onChange={handleAnswerChange}
        >
          {question.answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
