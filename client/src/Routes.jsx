import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';
import Signin from './components/Signin.jsx';
// import Broadcastboard from './components/Broadcastboard';
import notFoundPage from './components/NotFoundPage.jsx';
import DashBoard from './components/DashBoard.jsx';

const RequireAuth = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}
      />
    )
  )}
  />
);


const Routes = () => (
  <main>
     <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <RequireAuth exact path='/broadcastboard' component={DashBoard} />
      <Route component={notFoundPage} />
    </Switch>
  </main>
);

export default Routes;
