import React from 'react';
import ReactDOM from 'react-dom';
/*import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';*/

class postit extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <Content/>
            <div>
                <ul>
                  <li>SignUp</li>
                  <li>Login</li>
                </ul>

                {this.props.children}
            </div>
        </div>
      );
   }
}
export default postit;

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Welcome To Post-It</h1>
         </div>
      );
   }
}
export default Header;

class Content extends React.Component {
   render() {
      return (
         <div>
            <h2>A new platform to change the world of social media.</h2>
            <p>Post-It is an application that allows for exchange of 
               information between users. Users like friends and colleagues &nbsp
               can create groups for notifications, this way one person can post &nbsp
               notifications by sending a message once.
            </p>
         </div>
      );
   }
}
export default Content;

class SignUp extends React.Component {
    render() {
       return (
          <div>
             <h4>SignUp</h4>
          </div>
       );
    }
}
export default SignUp;

class Login extends React.Component {
    render() {
        return (
            <div>
                <h4>Login</h4>
            </div>
        );
    }
}
export default Login;
