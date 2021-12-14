import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserProfile from './pages/userProfile';

function Profile(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={`${match.url}/get/currentuser`} component={UserProfile} />
      </Switch>
   );
}

export default Profile;