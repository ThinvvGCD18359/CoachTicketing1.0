import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import StatisticPage from './pages';

function Statistic(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={match.url} component={StatisticPage} />
      </Switch>
   );
}

export default Statistic;