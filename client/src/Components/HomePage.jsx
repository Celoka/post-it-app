import React from 'react';
import Signup from '../components/Signup.jsx';
import Signin from '../components/Signin.jsx';

class Home extends React.Component {
  
  render() {
    return (
        <div>
            <div className="container">
		        <div className="row">
			        <div className='col-md-6'>
				        <h4>Welcome to <strong>Post It</strong>, where high level of interaction and information exchange is guaranteed.</h4>
				    </div>
				    <Signup />
			    </div>
			</div>
        </div>
    );
  }
}
// Export Home
export default Home;