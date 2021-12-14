import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from '../../features/Home/pages';
import { Redirect } from 'react-router-dom';

export default function MainPage({ isRegisterRedirect }) {
    return (
        <React.Fragment>
            {isRegisterRedirect && (
                <Redirect to='/account/register' />
            )}
            <CssBaseline />
            <HomePage />
        </React.Fragment>
    );
}