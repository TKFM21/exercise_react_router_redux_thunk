import _ from 'lodash';
import he from 'he';

class Quiz {
    constructor({ question, correct_answer, incorrect_answers }) {
        this._question = question;
        this._correctAnswer = correct_answer;
        this._incorrectAnswers = incorrect_answers;
    }

    get question() {
        return this._question;
    }

    get correctAnswer() {
        return this._correctAnswer;
    }

    shuffledAnswers() {
        return _.shuffle([ this._correctAnswer, ...this._incorrectAnswers ]);
    }

    // results: Array（要素はオブジェクトでquestion, correct_answer, incorrect_answersキーを持つ）
    static quizChangeInstanceAndArray(results) {
        return results.map( quiz => {
            const data = {
                question: he.decode(quiz.question),
                correct_answer: he.decode(quiz.correct_answer),
                incorrect_answers: quiz.incorrect_answers.map( answer => he.decode(answer))
            };
            return new Quiz(data);
        });
    }
}

export default Quiz;