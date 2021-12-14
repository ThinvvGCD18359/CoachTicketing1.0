import React from 'react';
import { Typography } from '@material-ui/core';
import { Bar } from "react-chartjs-2";

function CoachesStatistic(props) {
    const { coaches } = props;
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>Coaches</Typography>
            <Bar
                data={{
                    labels: coaches?.map(({ departureDate }) => departureDate),
                    datasets: [
                        {
                            data: coaches?.map(({ countRoute }) => countRoute),
                            label: "Coaches per day",
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1,
                        }
                    ]
                }}
                
            />
        </React.Fragment>
    );
}

export default CoachesStatistic;