import { Container } from '@material-ui/core';
import 'firebase/auth';
import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, firebase } from "../../../../firebase/index";
import Banner from '../../../../layouts/Banner';
import Footer from '../../../../layouts/Footer';
import Header from '../../../../layouts/Header';


const uiConfig = {
    signInFlow: 'popup',
    signinSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    },
}

function Login() {
    return (
        <Container maxWidth="lg">
            <Header />
            <Banner />
            <h3>Please Login</h3>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            <Footer />
        </Container>
    )
}

export default Login