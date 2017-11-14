import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateUser from './components/CreateUser.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import GoogleUpdate from './components/GoogleUpdate';
import NotFoundPage from './components/NotFoundPage.jsx';
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
      <Route exact path='/' component={ Home } />
      <Route path='/signup' component={ CreateUser } />
      <Route path='/signin' component={ Login } />
      <Route path='/googlepage' component={GoogleUpdate} />
      <Route exact path ='/resetpassword' component={ ResetPassword } />
      <RequireAuth path='/dashboard' component={ DashBoard } />
      <Route component={NotFoundPage} />
    </Switch>
  </main>
);

export default Routes;
