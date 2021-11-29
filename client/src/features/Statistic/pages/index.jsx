import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import coachApi from '../../../api/coachApi';
import { Container } from '@material-ui/core';
import Header from '../../../layouts/Header';
import Banner from '../../../layouts/Banner';
import Footer from '../../../layouts/Footer';


function Statistic(props) {
    const [statistic, setStatistic] = useState([]);
    useEffect(() => {
        const getStatistic = async () => {
            const response = await coachApi.getStatistic();
            setStatistic(response);
        }
        getStatistic();
    }, [])
    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <div>
                <Bar
                    data={{
                        labels: statistic?.map(({ departureDate }) => departureDate),
                        datasets: [
                            {
                                data: statistic?.map(({ countRoute }) => countRoute),
                                label: "Coaches per day",
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            }
                        ]
                    }}
                />
            </div>
            <Footer />
        </Container>
    );
}

export default Statistic;