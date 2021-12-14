import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import userApi from '../../api/userApi';
import CoachPage from './pages/CoachMain';
import CreateCoach from './pages/CreateCoach';
import CreateRoute from './pages/CreateRoute';

function Coach(props) {
   const match = useRouteMatch();
   const currentUserId = useSelector(state => state.user.current.id);
   const [userData, setUserData] = useState({role: "coachOwner"});

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
         <Route exact path={match.url} component={CoachPage} />
         {userData.role === "coachOwner"
            ? (
               <>
                  <Route path={`${match.url}/create/route/:coachId`} component={CreateRoute} />
                  <Route path={`${match.url}/create/coach`} component={CreateCoach} />
               </>
            ) : (
               <>
                  <Redirect to="/404" />
               </>
            )}
      </Switch>
   );
}

export default Coach;