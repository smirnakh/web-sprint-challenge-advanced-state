import axios from 'axios';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  RESET_FORM,
  INPUT_CHANGE,
} from './action-types';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(data) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: data,
  };
}

export function setMessage(data) {
  return {
    type: SET_INFO_MESSAGE,
    payload: data,
  };
}

export function setQuiz(data) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: data,
  };
}

export function inputChange(data) {
  return {
    type: INPUT_CHANGE,
    payload: data,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        dispatch(setMessage('Something went wrong'));
        console.log(err);
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(data) {
  return function (dispatch) {
    axios
      .post('http://localhost:9000/api/quiz/answer', data)
      .then((res) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        dispatch(setMessage('Something went wrong'));
        console.log(err);
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz(data) {
  return function (dispatch) {
    axios
      .post('http://localhost:9000/api/quiz/new', data)
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${data.question_text}" is a great question!`)
        );
        dispatch(resetForm());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setMessage('Something went wrong'));
      });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
