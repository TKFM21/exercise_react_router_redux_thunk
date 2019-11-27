import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchQuizzes,
    judgeCorrected,
    judgeIncorrected
} from '../../actions/quizActionCreator';

class Quiz extends React.Component {
    render() {
        return (
            <div>
                <h1>Quiz</h1>
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