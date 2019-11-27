import store from '../../store';

describe('store/index TEST', () => {
    it('storeの初期値', () => {
        expect( store.getState() ).toStrictEqual({
            isLoading: true,
            quizzes: [],
            error: null,
            currentIndex: 0,
            numberOfCorrected: 0
        });
    });
});