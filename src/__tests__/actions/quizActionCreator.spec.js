import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    fetchQuizzes,
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    judgeCorrected,
    judgeIncorrected,
    JUDGE_CORRECTED,
    JUDGE_INCORRECTED
} from '../../actions/quizActionCreator';
import Quiz from '../../models/Quiz';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action/quizActionCreator TEST', () => {
    it('success fetch', async () => {
        const expectedResult = [1, 2].map( number => {
            return {
                question: 'dummy' + number,
                correct_answer: 'correct_answer' + number,
                incorrect_answers: [1, 2, 3].map( dummy => 'test' + dummy )
            };
        });
        axios.get.mockResolvedValue({
            data: {
                results: expectedResult
            }
        });

        const store = mockStore();
        await store.dispatch(fetchQuizzes());

        expect( store.getActions() ).toStrictEqual([
            {
                type: FETCH_REQUEST
            },
            {
                type: FETCH_SUCCESS,
                quizzes: Quiz.quizChangeInstanceAndArray(expectedResult)
            }
        ]);
    });
    it('failure fetch', async () => {
        const expectedResult = 'error';
        axios.get.mockRejectedValue({
            message: expectedResult
        });
        const store = mockStore();
        await store.dispatch(fetchQuizzes());

        expect( store.getActions() ).toStrictEqual([
            {
                type: FETCH_REQUEST
            },
            {
                type: FETCH_FAILURE,
                error: {
                    message: expectedResult
                }
            }
        ]);
    });
    it('judgeCorrectedはオブジェクトでtypeキーあり', () => {
        const getAction = judgeCorrected();
        expect( getAction ).toStrictEqual({
            type: JUDGE_CORRECTED
        });
    });
    it('judgeIncorrectedはオブジェクトでtypeキーあり', () => {
        const getAction = judgeIncorrected();
        expect( getAction ).toStrictEqual({
            type: JUDGE_INCORRECTED
        });
    });
});