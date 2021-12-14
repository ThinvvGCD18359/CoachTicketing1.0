import React, { useEffect, useState } from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';
import SignIn from './pages/loginPage';
import { Switch, Route } from 'react-router-dom';
import Register from './pages/registerPage';
import { useSelector } from 'react-redux';
import userApi from '../../api/userApi';

function Auth(props) {
   const match = useRouteMatch();
   const currentUserId = useSelector(state => state.user.current.id);
   const [userData, setUserData] = useState({});

   useEffect(() => {
      if (!currentUserId) return
      const checkUserExist = async () => {
         try {
            const getUserDetailData = await userApi.getUserData({ currentUserId });
            setUserData(getUserDetailData);

         } catch (error) {
            console.log(error)
         }
      }
      checkUserExist();
   }, [currentUserId]);

   return (
      <Switch>
         <Route exact path={match.url} component={SignIn} />
         {userData.role === ""
            && (
               <Route path={`${match.url}/register`} component={Register} />
            )}
         <Redirect to="/404" />
      </Switch>
   );
}

export default Auth;