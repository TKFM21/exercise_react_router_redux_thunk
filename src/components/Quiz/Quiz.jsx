import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchQuizzes,
    judgeCorrected,
    judgeIncorrected
} from '../../actions/quizActionCreator';
import './Quiz.css';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

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
        const { isLoading, quizzes, currentIndex, numberOfCorrected } = this.props;
        if (isLoading) {
            // Quizデータ読み込み時
            return (
                <div className="quiz-container">
                    <h1>Quiz</h1>
                    <p>Now Loading...</p>
                    <hr/>
                    <Typography>
                        <Link color="textSecondary" component={Link1} to="/">
                            Home
                        </Link>
                    </Typography>
                </div>
            )
        }
        if (currentIndex >= quizzes.length) {
            // Quiz回答結果の表示
            return (
                <div className="quiz-container">
                    <h1>Quiz</h1>
                    <h2>Result</h2>
                    <h3>{numberOfCorrected}/{quizzes.length}</h3>
                    <Button onClick={this.props.fetchQuizzes} variant="outlined" color="secondary">Restart</Button>
                    <hr/>
                    <Typography>
                        <Link color="textSecondary" component={Link1} to="/">
                            Home
                        </Link>
                    </Typography>
                </div>
            )
        }

        // Quiz表示
        const quiz = quizzes[currentIndex];
        const answers = quiz.shuffledAnswers().map( (answer, index) => {
            return (
                <ListItem
                    key={index}
                    onClick={() => this.judgeAnswer(quiz, answer)}
                    button
                    divider
                    style={{ width: '70%', margin: 'auto', textAlign: 'center' }}
                >
                    <ListItemText primary={answer} />
                </ListItem>
            );
        });
        return (
            <div className="quiz-container">
                <h1>Quiz</h1>
                <h2>{quiz.question}</h2>
                <List component="nav">
                    {answers}
                </List>
                <hr/>
                <Typography>
                    <Link color="textSecondary" component={Link1} to="/">
                        Home
                    </Link>
                </Typography>
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