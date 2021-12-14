import React from 'react';
import { Typography } from '@material-ui/core';
import { Line } from "react-chartjs-2";

function BalanceStatistic(props) {
    const { balance } = props;
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Balance</Typography>
            <Line
                data={{
                    labels: balance?.map(({ ticketDate }) => ticketDate),
                    datasets: [
                        {
                            data: balance?.map(({ total }) => total),
                            label: "Income per day",
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.5)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1,
                        }
                    ]
                }}
                
            />
        </React.Fragment>
    );
}

export default BalanceStatistic;