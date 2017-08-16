import React from 'react';

import { Link } from 'react-router-dom';


class CreateGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      groupname: '',
		};
		
	
  render() {
    return (
			<div>
				<nav className="navbar navbar-inverse navabar-fixed-top"
					role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle"
								data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">
                <strong> PostIt </strong>
              </Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
								<li><Link to="/Broadcastboard">ChatRoom</Link></li>
								<li className="active"><Link to="">Create Group</Link></li>
								<li onClick={this.onClick}><Link to="">Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
				<div className="container">
					<div className="row">
						<div className="col-md-offset-3 col-md-6">
							<div className='row'>
								<form className="signin"
									onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="groupname">Group Name</label>
										<input value={this.state.group} onChange={this.onChange}
											id="groupname" type="text"
											className="googleform"
											name='group' required/>
									</div>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="googleform"
											name='email' required/>
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input value={this.state.password} onChange={this.onChange}
											id="pass" type="password"
											className="googleform" 
											name='password' required/>
									</div>
									<button type="submit"
										className="googleformbtn">Create Group
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
}
export default CreateGroup;
