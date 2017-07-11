import React from 'react';
import Signup from '../components/Signup.jsx';
import Signin from '../components/Signin.jsx';

class Homepage extends React.Component {
  
  render() {
    return (
        <div>
            <div className="container">
		        <div className="row">
			        <div className='col-md-6'>
				        <h4>Welcome to <strong>Post It</strong>, where high level of interaction and information exchange is guaranteed.</h4>
				    </div>
                    <div className="container">
                        <div className="row">
                            <div className='col-md-12'>
				                <Signup />
                            </div>
                        </div>
                    </div>    
			    </div>
			</div>
        </div>
    );
  }
}

export default Homepage;