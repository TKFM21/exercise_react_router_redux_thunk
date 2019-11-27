import {
    judgeCorrected,
    judgeIncorrected,
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE
} from '../../actions/quizActionCreator';
import quizReducer from '../../reducers/quizReducer';

const initialState = {
    isLoading: true,
    quizzes: [],
    error: null,
    currentIndex: 0,
    numberOfCorrected: 0
};

describe('reducers/quizReducer TEST', () => {
    it('case FETCH_REQUEST stateは初期値に戻る', () => {
        const action = { type: FETCH_REQUEST };
        const newState = quizReducer(undefined, action);
        expect( newState ).toStrictEqual( initialState );
    });
    it('case FETCH_SUCCESS　actionのquizzesキーがnewStateへ反映される', () => {
        const action = {
            type: FETCH_SUCCESS,
            quizzes: ['dummy1', 'dummy2']
        };
        const newState = quizReducer(undefined, action);
        expect( newState.quizzes ).toStrictEqual( action.quizzes );
        expect( newState.isLoading ).toStrictEqual(false);
    });
    it('case FETCH_FAILURE　actionのerrorキーがnewStateへ反映される', () => {
        const action = {
            type: FETCH_FAILURE,
            error: 'dummy1'
        };
        const newState = quizReducer(undefined, action);
        expect( newState.error ).toStrictEqual( action.error );
        expect( newState.isLoading ).toStrictEqual(false);
    });
    it('case JUDGE_CORRECTED currentIndexとnumberOfCorrectedが1となる', () => {
        const action = judgeCorrected();
        const newState = quizReducer(undefined, action);
        expect( newState.currentIndex ).toStrictEqual(1);
        expect( newState.numberOfCorrected ).toStrictEqual(1);
    });
    it('case JUDGE_INCORRECTED　currentIndexが1、numberOfCorrectedは0', () => {
        const action = judgeIncorrected();
        const newState = quizReducer(undefined, action);
        expect( newState.currentIndex ).toStrictEqual(1);
        expect( newState.numberOfCorrected ).toStrictEqual(0);
    });
});