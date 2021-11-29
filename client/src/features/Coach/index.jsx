import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import userApi from '../../api/userApi';
import CoachPage from './pages/CoachMain';
import CoachTable from './pages/CoachTable';
import CreateCoach from './pages/CreateCoach';
import CreateRoute from './pages/CreateRoute';

function Coach(props) {
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
         <Route exact path={match.url} component={CoachPage} />
         {userData.role === "coachOwner"
            ? (
               <>
                  <Route path={`${match.url}/create/route/:coachId`} component={CreateRoute} />
                  <Route path={`${match.url}/create/coach`} component={CreateCoach} />
                  <Route path={`${match.url}/mycoach`} component={CoachTable} />
               </>
            ) : (userData.role === "admin" && (
               <>
               </>
            ))}
      </Switch>
   );
}

export default Coach;