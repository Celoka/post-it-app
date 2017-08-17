import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
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

const RestrictedPage = ({ component: Component, ...rest }) => (
<Route
{...rest}
render={props => (
  localStorage.getItem('token') ? (
    <Component {...props} />
  ) : (
    <Redirect to={{
      pathname: '/broadcastboard',
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
      <RestrictedPage exact path='/' component={Home} />
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <RequireAuth exact path='/broadcastboard' component={DashBoard} />
      <Route component={notFoundPage} />
    </Switch>
  </main>
);

export default Routes;
