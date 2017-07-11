import React from 'react';

class Navbar extends React.Component {
   render() {
      return (
         <div>
              <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle=
                                    "collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                 <span className="sr-only">Toggle navigation</span>
                                 <span className="icon-bar"></span>
                                 <span className="icon-bar"></span>
                                 <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">Post It</a>
                           </div>
                           <div id="navbar" className="collapse navbar-collapse">
                                 <ul className="nav navbar-nav">
                                      <li><a href="#">Home</a></li>
                                      <li><a href="#Signup">SignUp</a></li>
                                      <li><a href="#Signin">SignIn</a></li>
                                      <li><a href="#about">About</a></li>
                                 </ul>
                          </div>
                   </div>
             </nav>
       </div>
      );
   }
}

export default Navbar;
