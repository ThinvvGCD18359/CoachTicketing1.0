import React, { useEffect, useState } from "react";
import ticketApi from "../../../../api/ticketApi";
import { useParams } from "react-router-dom";
import DetailTicket from "../../components/detailTicket";
import { Container } from "@material-ui/core";
import Header from "../../../../layouts/Header";
import Banner from "../../../../layouts/Banner";
import Footer from "../../../../layouts/Footer";


export default function BookedTickets() {
    const [ticket, setTicket] = useState({});
    const { ticketId } = useParams();

    useEffect(() => {
        const getTicketDetail = async () => {
            if (!ticketId) return
            const response = await ticketApi.getDetailTicket({ ticketId });
            setTicket(response);
        };
        getTicketDetail();
    }, [ticketId]);

    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <DetailTicket ticket={ticket} />
            <Footer />
        </Container>
    );
}
