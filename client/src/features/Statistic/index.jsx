import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailStatistic from './pages/DetailStatistic';
import StatisticPage from './pages/StatisticPage';

function Statistic(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={match.url} component={StatisticPage} />
         <Route path={`${match.url}/detail`} component={DetailStatistic} />
      </Switch>
   );
}

export default Statistic;