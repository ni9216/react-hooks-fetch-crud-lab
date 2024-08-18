import React, { useEffect, useState } from 'react';
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion} />
        ))}
      </ul>
    </section>
  );

  // Function to handle the deletion of a question (see DELETE /questions/:id)
  function handleDeleteQuestion(deletedQuestion) {
    setQuestions(questions.filter((question) => question.id !== deletedQuestion.id));
  }

  // Function to handle the update of a question (see PATCH /questions/:id)
  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    setQuestions(updatedQuestions);
  }
}

export default QuestionList;
