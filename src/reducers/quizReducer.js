import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    JUDGE_CORRECTED,
    JUDGE_INCORRECTED
} from '../actions/quizActionCreator';

const initialState = {
    isLoading: true,
    quizzes: [],
    error: null,
    currentIndex: 0,
    numberOfCorrected: 0
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                isLoading: true,
                quizzes: [],
                error: null,
                currentIndex: 0,
                numberOfCorrected: 0
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: action.quizzes
            };
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case JUDGE_CORRECTED:
            return {
                ...state,
                currentIndex: state.currentIndex + 1,
                numberOfCorrected: state.numberOfCorrected + 1
            };
        case JUDGE_INCORRECTED:
            return {
                ...state,
                currentIndex: state.currentIndex + 1
            };
        default:
            return state;
    }
};

export default quizReducer;