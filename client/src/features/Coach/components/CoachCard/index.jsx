import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import coachPic from '../../../../images/coach.png';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    card: {
        display: 'flex',
        width: 400,
    },
    cardMedia: {
        height: 140,
    },
}));

CoachCard.propTypes = {
    coaches: PropTypes.array,
};

CoachCard.defaultProps = {
    coaches: [],
};

export default function CoachCard(props) {
    const classes = useStyles();
    const { coaches } = props;

    return (
        <Container className={classes.root}>
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {coaches?.map((coach) => (
                    <Grid item xs={12} sm={6} md={3} key={coach.id}>
                        <Link className="Link" key={coach.id} to={`/booking/${coach.id}`}>
                            <Card >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={coachPic}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography component="h2" variant="h5">
                                            Coach: {coach.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            From: {coach.Route.starting}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            To: {coach.Route.destination}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Price: {coach.Route.price} $
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
