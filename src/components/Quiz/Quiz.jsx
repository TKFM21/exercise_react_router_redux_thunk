import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchQuizzes,
    judgeCorrected,
    judgeIncorrected
} from '../../actions/quizActionCreator';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.judgeAnswer = this.judgeAnswer.bind(this);
    }
    componentDidMount() {
        this.props.fetchQuizzes();
    }

    judgeAnswer(quiz, answer) {
        if (answer === quiz.correctAnswer) {
            window.alert('Correct!');
            this.props.judgeCorrected();
        } else {
            window.alert(`Wrong Answer. Correct Answer is ${quiz.correctAnswer}`);
            this.props.judgeIncorrected();
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div>
                    <h1>Quiz</h1>
                    <p>Now Loading...</p>
                    <hr/>
                    <Link to="/">Home</Link>
                </div>
            )
        }
        const quiz = this.props.quizzes[this.props.currentIndex];
        const answers = quiz.shuffledAnswers().map( (answer, index) => {
            return (
                <div
                    key={index}
                    onClick={() => this.judgeAnswer(quiz, answer)}
                >
                    {answer}
                </div>
            );
        });
        return (
            <div>
                <h1>Quiz</h1>
                <h2>{quiz.question}</h2>
                {answers}
                <hr/>
                <Link to="/">Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        quizzes: state.quizzes,
        error: state.error,
        currentIndex: state.currentIndex,
        numberOfCorrected: state.numberOfCorrected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizzes: () => {
            const action = fetchQuizzes();
            dispatch(action);
        },
        judgeCorrected: () => {
            const action = judgeCorrected();
            dispatch(action);
        },
        judgeIncorrected: () => {
            const action = judgeIncorrected();
            dispatch(action);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);