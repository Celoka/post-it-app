import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Home from './components/Home.jsx';
import Signin from './components/Signin.jsx';
import notFoundPage from './components/NotFoundPage.jsx';
import DashBoard from './components/DashBoard.jsx';
import ResetPassword from './components/ResetPassword.jsx';

const RequireAuth = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    localStorage.getItem('token') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
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
      <Route exact path='/' component={Home} />
      <Route path='/signup' component={Signup} />
      <Route path='/signin' component={Signin} />
      <Route exact path ='/resetpassword' component={ResetPassword} />
      <RequireAuth  path='/dashboard' component={DashBoard} />
      <Route component={notFoundPage} />
    </Switch>
  </main>
);

export default Routes;
