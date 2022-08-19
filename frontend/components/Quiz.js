import React, { useEffect } from 'react';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';
import { useSelector, useDispatch } from 'react-redux';
export default function Quiz(props) {
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz);
  const selectedAnswer = useSelector((state) => state.selectedAnswer);
  useEffect(() => {
    dispatch(fetchQuiz());
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={
                  selectedAnswer === quiz.answers[0].answer_id
                    ? 'answer selected'
                    : 'answer'
                }
              >
                {quiz.answers[0].text}
                <button
                  onClick={() =>
                    dispatch(selectAnswer(quiz.answers[0].answer_id))
                  }
                >
                  {selectedAnswer === quiz.answers[0].answer_id
                    ? 'SELECTED'
                    : 'Select'}
                </button>
              </div>

              <div
                className={
                  selectedAnswer === quiz.answers[1].answer_id
                    ? 'answer selected'
                    : 'answer'
                }
              >
                {quiz.answers[1].text}
                <button
                  onClick={() =>
                    dispatch(selectAnswer(quiz.answers[1].answer_id))
                  }
                >
                  {selectedAnswer === quiz.answers[1].answer_id
                    ? 'SELECTED'
                    : 'Select'}
                </button>
              </div>
            </div>

            <button
              disabled={selectedAnswer ? false : true}
              id="submitAnswerBtn"
              onClick={() =>
                dispatch(
                  postAnswer({
                    quiz_id: quiz.quiz_id,
                    answer_id: selectedAnswer,
                  })
                )
              }
            >
              Submit answer
            </button>
          </>
        ) : (
          'Loading next quiz...'
        )
      }
    </div>
  );
}
