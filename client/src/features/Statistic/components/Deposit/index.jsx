import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

function Deposit(props) {
    const classes = useStyles();
    const {balance} = props;
    const day = moment().format('MMM Do YYYY');
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Total Balance</Typography>
            <Typography component="p" variant="h4">
                $ {balance}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {day}
            </Typography>
            <div>
                <Link className='Link' to='/statistic/detail'>
                    View Detail
                </Link>
            </div>
        </React.Fragment>
    );
}

export default Deposit;