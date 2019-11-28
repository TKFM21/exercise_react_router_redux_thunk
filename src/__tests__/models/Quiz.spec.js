import Quiz from '../../models/Quiz';
import he from 'he';

const dummy = {
    question: 'dummy question',
    correct_answer: 'dummy correct answer',
    incorrect_answers: [ 'dummy1', 'dummy2', 'dummy3' ]
};

describe('models/Quiz Test', () => {
    describe('Instance Method', () => {
        it('ダミーインスタンスを作成してプロパティの確認', () => {
            const quiz = new Quiz(dummy);
            expect( quiz.question ).toStrictEqual(dummy.question);
            expect( quiz.correctAnswer ).toStrictEqual(dummy.correct_answer);
            expect( quiz._incorrectAnswers ).toStrictEqual(dummy.incorrect_answers);
        });
    
        it('shuffledAnswers: 4つの答えがシャッフルされる', () => {
            const quiz = new Quiz(dummy);
            const shuffled1 = quiz.shuffledAnswers();
            const shuffled2 = quiz.shuffledAnswers();
            expect( shuffled1 ).not.toStrictEqual( shuffled2 );
        });
    });
    describe('Class Method', () => {
        it('quizChangeInstanceAndArray: インスタンス要素の配列でデコードされる', () => {
            const dummy2 = {
                question: '&copy; 2019 question', // © 2019 question
                correct_answer: '&copy; 2019 correctAnswer', // © 2019 correctAnswer
                incorrect_answers: [ '&lt;p&gt;1', '&lt;p&gt;2', '&lt;p&gt;3' ] // <p>1, <p>2, <p>3
            };
            const dummyList = [ dummy, dummy2 ];
            const quizzes = Quiz.quizChangeInstanceAndArray(dummyList);
            expect( Array.isArray(quizzes) ).toStrictEqual(true);
            expect( quizzes.length ).toStrictEqual(2);
            quizzes.forEach( (quiz, index) => {
                expect( quiz instanceof Quiz ).toStrictEqual(true);
                const question = dummyList[index].question;
                expect( quiz.question ).toStrictEqual( he.decode(question) );
                const correctAnswer = dummyList[index].correct_answer;
                expect( quiz.correctAnswer ).toStrictEqual( he.decode(correctAnswer) );
                const incorrectAnswers = dummyList[index].incorrect_answers;
                expect( quiz._incorrectAnswers ).toStrictEqual( incorrectAnswers.map(answer => he.decode(answer)) );
            });
        });
    });
});