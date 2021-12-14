import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import coachApi from '../../../../api/coachApi';
import { Container, Grid, Paper } from '@material-ui/core';
import Header from '../../../../layouts/Header';
import Banner from '../../../../layouts/Banner';
import Footer from '../../../../layouts/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Deposit from '../../components/Deposit';
import Coaches from '../../components/Coaches/index';

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
    fixedHeight: {
        height: 200,
    },
}));

function Statistic(props) {
    const classes = useStyles();
    const [balance, setBalance] = useState([]);

    useEffect(() => {
        const getBalance = async () => {
            const response = await coachApi.getBalanceStatistic();
            setBalance(response);
        }
        getBalance();
    }, []);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={classes.paper}>
                            <Coaches />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Deposit balance={balance}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Container>
    );
}

export default Statistic;