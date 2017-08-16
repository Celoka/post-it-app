import React from 'react';
import {Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
import Broadcastboard from './components/Broadcastboard';
import notFoundPage from './components/NotFoundPage.jsx';
import DashBoard from './components/DashBoard.jsx';
const Routes = ()=> (
   <Switch>
    <Route exact path="/" component={Home} />  
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path ='/broadcastboard' component={DashBoard} />
    <Route component={notFoundPage} />
  </Switch>

)
export default Routes;