import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateUser from '../src/components/container/CreateUser';
import Home from '../src/components/presentation/Home';
import Login from '../src/components/container/Login';
import GoogleUpdate from '../src/components/container/GoogleUpdate';
import NotFoundPage from '../src/components/presentation/NotFoundPage';
import DashBoard from '../src/components/container/DashBoard';
import ResetPassword from '../src/components/presentation/ResetPassword';

/**
 * @description describesa function that checks for a user token in
 * the local storage and subsequently use this to redirect the user to
 * the appropriate page
 *
 * @param { component } param0
 *
 * @return { void }
 */
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
