import { fromByteArray } from 'ipaddr.js';
import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const onChange = (evt) => {
    dispatch(
      actionCreators.inputChange({
        name: evt.target.id,
        value: evt.target.value,
      })
    );
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      actionCreators.postQuiz({
        question_text: form.newQuestion,
        true_answer_text: form.newTrueAnswer,
        false_answer_text: form.newFalseAnswer,
      })
    );
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        value={form.newQuestion}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        value={form.newTrueAnswer}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        value={form.newFalseAnswer}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button
        id="submitNewQuizBtn"
        disabled={
          !form.newQuestion.trim().length > 0 ||
          !form.newTrueAnswer.trim().length > 0 ||
          !form.newFalseAnswer.trim().length > 0
        }
      >
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form);
