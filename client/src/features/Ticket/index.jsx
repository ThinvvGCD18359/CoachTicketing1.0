import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TicketPage from './pages/detailTicket';
import UserTicket from './pages/userTicket';
import DetailTicket from './pages/detailTicket';

function Ticket(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={match.url} component={TicketPage} />
         <Route path={`${match.url}/myticket`} component={UserTicket} />
         <Route path={`${match.url}/detail/:ticketId`} component={DetailTicket} />
      </Switch>
   );
}

export default Ticket;