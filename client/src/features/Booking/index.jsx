import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Booking from './pages/bookingMain/index';

function Coach(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={`${match.url}/:coachId`} component={Booking} />
      </Switch>
   );
}

export default Coach;