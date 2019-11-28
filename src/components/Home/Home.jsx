import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles({
    card: {
        margin: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        minWidth: 200,
        maxWidth: 300,
        backgroundColor: '#f5f5f5'
    },
        title: {
            fontSize: 36,
    },
        pos: {
            marginBottom: 10,
    }
});

const Home = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} variant="h5" component="h1">
                    Home
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    what will you do?
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" color="primary" to="/quiz" component={Link1}>Quiz Start!!</Button>
            </CardActions>
        </Card>
    );
};

export default Home;