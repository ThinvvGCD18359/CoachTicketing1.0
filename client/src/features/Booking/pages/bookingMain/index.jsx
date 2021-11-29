import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import SeatMap from "../../components/bookingMap/seatMap";
import Header from "../../../../layouts/Header";
import Banner from "../../../../layouts/Banner";
import Footer from "../../../../layouts/Footer";
import BookingSeat from "../../components/bookingSeat";
import coachApi from '../../../../api/coachApi';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';
import { useParams } from 'react-router-dom';
import ticketApi from "../../../../api/ticketApi";

export default function CoachDetail({ data }) {
  const { coachId } = useParams();
  const [total, setTotal] = useState([]);
  const [coach, setCoach] = useState([]);
  const [user, setUser] = useState([]);
  const [reservationSeat, setReservationSeat] = useState([]);
  const currentUserId = useSelector(state => state.user.current.id)

  useEffect(() => {
    const getUser = async () => {
      if (currentUserId) {
        const response = await userApi.getUserData({ currentUserId });
        setUser(response);
      }
    }
    getUser();
  }, [currentUserId]);

  useEffect(() => {
    const getCoach = async () => {
      if (!coachId) return
      const response = await coachApi.getCoachDetail({ coachId });
      setCoach(response);
    }
    getCoach()
  }, [coachId]);

  useEffect(() => {
    const getReserveSeat = async () => {
      if (!coachId) return
      const response = await ticketApi.getAllTicket({ coachId });
      setReservationSeat(response);
    }
    getReserveSeat();
  }, [coachId]);

  const handleSaveSeatRecord = (id) => {
    if (total.some(s => s === id)) {
      setTotal(total.filter(i => i !== id));
    } else {
      setTotal([...total, id]);
    }
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Banner />
      <div className="booking">
        <div className="booking-box-seat">
          <div className="booking-seat-price">
            <h3>Coach: {coach.name} |</h3>
            <span>Seat Price: {coach.Route?.price} $</span>
          </div>
        </div>
        <div className="legend-sub">
          <div className="legend-sub-each">
            <div className="legend-sub-each-logo"></div>
            <span>Available</span>
          </div>
          <div className="legend-sub-each">
            <div className="legend-sub-each-logo legend-sub-each-unavailable"></div>
            <span>Unavailable</span>
          </div>
        </div>
        <div className="booking-box">
          <div className="booking-bus-seats">
            <div>
              <h4>First floor</h4>
              <SeatMap data={data} reservationSeat={reservationSeat} type="Lower" handleSaveSeatRecord={handleSaveSeatRecord} />
            </div>
            <div>
              <h4>Second floor</h4>
              <SeatMap data={data} reservationSeat={reservationSeat} type="Upper" handleSaveSeatRecord={handleSaveSeatRecord} />
            </div>
          </div>
          <div className="booking-bus-option">
            <BookingSeat data={data} total={total} coach={coach} user={user} />
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
