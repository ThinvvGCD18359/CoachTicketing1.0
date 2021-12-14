import { unwrapResult } from "@reduxjs/toolkit";
import firebase from 'firebase/app';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import userApi from "./api/userApi";
import './App.css';
import Admin from "./features/Admin";
import Login from "./features/Auth/index";
import { getUser } from "./features/Auth/userSlice";
import Booking from './features/Booking/index';
import Coach from './features/Coach/index';
import Profile from "./features/Profile";
import Statistic from "./features/Statistic/index";
import Ticket from "./features/Ticket";
import MainPage from './layouts/Main';
import NotFound from "./layouts/NotFound";


function App() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.current.id);

  const [isRegisterRedirect, setIsRegisterRedirect] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log('User is not logged in');
        return;
      }
      try {
        const actionResult = await dispatch(getUser());
        const currentUser = unwrapResult(actionResult);
        // console.log('Logged in user: ', currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } catch (error) {
        console.log('Failed to login ', error.message);
      }
    });

    return () => unregisterAuthObserver();
  }, [dispatch]);

  useEffect(() => {
    if (!currentUserId) return
    const checkUserExist = async () => {
      try {
        const checkUser = await userApi.isUserExist({ currentUserId })
        // console.log(checkUser)
        if (checkUser.message === "User is not exist!!") {
          setIsRegisterRedirect(true)
        };
        const getUserDetailData = await userApi.getUserData({ currentUserId });
        setUserData(getUserDetailData);
      } catch (error) {
        console.log(error)
      }
    }
    checkUserExist();
  }, [currentUserId]);



  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={() => <MainPage isRegisterRedirect={isRegisterRedirect}/>} />
          <Route path={"/account"} component={Login} />
          {/* {isRegisterRedirect && (
            <Redirect to='/account/register' />
          )} */}
          
          <Route path={"/coach"} component={Coach} />
          <Route path={"/booking"} component={Booking} />
          <Route path={"/user"} component={Profile} />
          <Route path={"/404"} component={NotFound} />
          {userData.role === "user"
            ? (
              <>
                <Route path={"/ticket"} component={Ticket} />
              </>
            ) : (userData.role === "coachOwner" ? (
              <>
                <Route path={"/statistic"} component={Statistic} />
              </>
            ) : (userData.role === "admin" && (
              <>
                <Route exact path={"/admin"} component={Admin} />
              </>
            )))}
            <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
