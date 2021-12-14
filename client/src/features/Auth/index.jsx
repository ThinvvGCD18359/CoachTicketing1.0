import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import SignIn from './pages/loginPage';
import { Switch, Route } from 'react-router-dom';
import Register from './pages/registerPage';


function Auth(props) {
   const match = useRouteMatch();

   return (
      <Switch>
         <Route exact path={match.url} component={SignIn} />
         <Route path={`${match.url}/register`} component={Register} />
      </Switch>
   );
}

export default Auth;