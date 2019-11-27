import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import quizReducer from '../reducers/quizReducer';

const store = createStore(
    quizReducer,
    applyMiddleware(thunk)
);

export default store;