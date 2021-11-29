import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../api/userApi';
import Banner from '../../../layouts/Banner';
import Footer from '../../../layouts/Footer';
import Header from '../../../layouts/Header';


function Profile(props) {
    const [user, setUser] = useState([]);
    const currentUserId = useSelector(state => state.user.current.id);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await userApi.getUserData({ currentUserId });
                setUser(response);
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    }, [currentUserId]);

    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <Typography>Username: {user.username}</Typography>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Age: {user.age}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone number: {user.phonenumber}</Typography>
            <Typography>Role: {user.role}</Typography>
            <Footer />
        </Container>
    );
}

export default Profile;