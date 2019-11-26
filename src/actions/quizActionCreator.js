import axios from 'axios';
import Quiz from '../models/Quiz';

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const JUDGE_CORRECTED = 'JUDGE_CORRECTED';
export const JUDGE_INCORRECTED = 'JUDGE_INCORRECTED';

export const fetchQuizzes = () => {
    return async (dispatch) => {
        dispatch( fetchRequest() );
        try {
            const response = await axios.get(API_URL);
            const results = response.data.results;
            const quizzes = Quiz.quizChangeInstanceAndArray(results);
            dispatch( fetchSuccess(quizzes) );
        } catch (error) {
            dispatch( fetchFailure(error) );
        }
    }
};

const fetchRequest = () => {
    return {
        type: FETCH_REQUEST
    };
};

const fetchSuccess = (quizzes) => {
    return {
        type: FETCH_SUCCESS,
        quizzes
    };
};

const fetchFailure = (error) => {
    return {
        type: FETCH_FAILURE,
        error
    };
};

export const judgeCorrected = () => {
    return {
        type: JUDGE_CORRECTED
    };
};

export const judgeIncorrected = () => {
    return {
        type: JUDGE_INCORRECTED
    };
};