import React, { useEffect, useState } from 'react';
import coachApi from '../../../../api/coachApi';
import { Container, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import Header from '../../../../layouts/Header';
import Banner from '../../../../layouts/Banner';
import Footer from '../../../../layouts/Footer';
import { makeStyles } from '@material-ui/core/styles';
import CoachesStatistic from '../../components/Chart/Coaches';
import BalanceStatistic from '../../components/Chart/Balance';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

function DetailStatistic(props) {
    const classes = useStyles();
    const [coaches, setCoaches] = useState([]);
    const [balance, setBalance] = useState([]);

    useEffect(() => {
        const getCoachesStatistic = async () => {
            const response = await coachApi.getStatistic();
            setCoaches(response);
        }
        getCoachesStatistic();
    }, [])

    useEffect(() => {
        const getBalance = async () => {
            const response = await coachApi.getBalanceDetail();
            setBalance(response);
        }
        getBalance();
    }, []);

    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <Toolbar style={{ marginTop: 20 }}>
                <Typography className={classes.title} variant="h4" gutterBottom>
                    Statistic
                </Typography>
            </Toolbar>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <CoachesStatistic coaches={coaches} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <BalanceStatistic balance={balance} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Container>
    );
}

export default DetailStatistic;