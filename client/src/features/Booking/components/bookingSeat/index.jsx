import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ticketApi from '../../../../api/ticketApi';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function BookingSeat(props) {
    const { total, coach, user } = props;
    const history = useHistory();
    const classes = useStyles();
    const currentUserId = useSelector(state => state.user.current.id);
    const [userData, setUserData] = useState({});
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [missingSeat, setMissingSeat] = useState("");

    useEffect(() => {
        if (!currentUserId) return
        const checkUserLogin = async () => {
           try {
              const getUserDetailData = await userApi.getUserData({ currentUserId });
              setUserData(getUserDetailData);  
           } catch (error) {
              console.log(error)
           }
        }
        checkUserLogin();
     }, [currentUserId]);

    const handleOpen = () => {
        if (!currentUserId) {
            window.alert("Please login first");
            history.push('/account');
        };

        if (userData.role === "coachOwner") {
            window.alert("You cannot book seat as a Coach Owner");
            history.push('/');
        };

        if (userData.role === "admin") {
            window.alert("You cannot book seat as an Admin");
            history.push('/');
        };

        if (totalCost !== 0) {
            setOpen(true);
        } else {
            setMissingSeat("Please pick a seat!!!")
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addTicket = async () => {
        try {
            const response = await ticketApi.addNewTicket({
                coachId: coach.id,
                userId: user.id,
                seat: total,
                price: totalCost,
                createdAt: moment().toString(),
            });
            console.log("ticket:", response);
            history.push(`/ticket/detail/${response.id}`);
        } catch (error) {
            console.log(error);
        };

    }

    const timing = {
        arrival: moment(coach.Route?.departure)
            .add(8, "h")
            .toISOString(),
    };

    const totalCost = total.length * coach.Route?.price;

    const userConfirm = (
        <div style={modalStyle} className={classes.paper}>
            <div className="passenger-row">
                <h2 id="simple-modal-title">Confirm your information</h2>
                <button
                    className="passenger-back-button"
                    onClick={handleClose}
                ></button>
            </div>
            <div className="passenger-form-column passenger-form-column-disable">
                <label className="passenger-form-title">
                    Passenger: {user.username} |
                    <strong>Seat: {total?.map((seat) => {
                        return (
                            <span key={seat} className="bill-data-seat">
                                {seat}
                                {total.length > 1 ? "," : ""}
                            </span>
                        );
                    })}
                    </strong>

                </label>
            </div>
            <div className="passenger-form-column passenger-form-column-disable">
                <label className="passenger-form-title">Gender: {user.gender}</label>
            </div>
            <div className="passenger-form-column passenger-form-column-disable">
                <label className="passenger-form-title">Age: {user.age}</label>
            </div>
            <div className="passenger-form-column passenger-form-column-disable">
                <label className="passenger-form-title">Contact: {user.phonenumber}</label>
            </div>
            <div className="passenger-form-column passenger-form-column-disable">
                <label className="passenger-form-title">Total: {totalCost} $</label>
            </div>
            <div className="bill-data-each">
                <button
                    className="booking-confirm-button"
                    onClick={addTicket}
                >
                    Proceed To Pay
                </button>
            </div>
        </div>
    );


    return (
        <>
            <div className="bill">
                <div className="bill-data">
                    <div className="bill-data-each">
                        <strong>Departure {'&'} Destination</strong>
                        <div className="bill-data-each">
                            <strong>Time</strong>
                        </div>
                    </div>
                    <div className="bill-data-style">
                        <div className="bill-data-each">
                            <span>{coach.Route?.starting}</span>
                            <span style={{ fontWeight: "bold" }}>
                                {moment(coach.Route?.departure)
                                    .format('MMM-DD-YYYY, HH:mm')}
                            </span>
                        </div>
                        <div className="bill-data-each">
                            <span>{coach.Route?.destination}</span>
                            <span style={{ fontWeight: "bold" }}>
                                {moment(timing.arrival)
                                    .format('MMM-DD-YYYY, HH:mm')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bill-data-each bill-data-seats ">
                    <strong>Seat No.</strong>
                    <div>
                        {total?.map((seat) => {
                            return (
                                <span key={seat} className="bill-data-seat">
                                    {seat}
                                    {total.length > 1 ? "," : ""}
                                </span>
                            );
                        })}
                    </div>

                </div>
                <div className="booking-confirm">
                    <span className="booking-confirm-alert">{missingSeat}</span>
                    <div className="booking-confirm-button-box">
                        <strong>Total</strong>
                        <strong>{totalCost} $</strong>
                    </div>
                    <div>
                        <span className="bill-data-subtitle">
                            (Tax is included)
                        </span>
                    </div>
                </div>
                <div className="bill-data-each">
                    <button
                        className="booking-confirm-button"
                        onClick={handleOpen}
                    >
                        PROCEED TO BOOK
                    </button>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
            >
                {userConfirm}
            </Modal>
        </>
    );
}

export default BookingSeat;