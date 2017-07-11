import React from 'react';
import axios from 'axios';


class Signup extends React.Component {
  
  constructor(props) { 
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(signup) {
    this.setState({
      [signup.target.name]: signup.target.value
    });
  }

  onSubmit(signup) {
    signUp.preventDefault();
    const userDetails = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
  }

  render() {
    return (
			<div>
				<div className="scontainer">
				 <div className="col-md-5 col-md-offset-1">
					<div className='row'>
						<div className='col-md-12'>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor='email'>Email</label>
									<input value={this.state.email} onChange={this.onChange}
										id='email' type="email"
										className="googleform inp"
										name='email' required />
								</div>
								<div className="form-group">
									<label htmlFor='username'>Username</label>
									<input value={this.state.username} onChange={this.onChange}
										id='username' type="text"
										className="googleform"
										name='username' required />
								</div>
								<div className="form-group">
									<label htmlFor='password'>Password</label>
									<input value={this.state.password} onChange={this.onChange}
										id='pass' type="password"
										className="googleform"
										name='password' required />
								</div>
								<button type="submit"
									className="googleformbtn">Sign up
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default Signup;