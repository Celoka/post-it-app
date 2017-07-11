import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class AddMember extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      member: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    axios.post('/signout').then((response) => {
      alert(response.data.message);

      this.props.history.push('/');
    }).catch((error) => {
      if (error.response) {
      }
    });
  }

  onChange(addmember) {
    this.setState({
      [addmember.target.name]: addmember.target.value
    });
  }

  onSubmit(addmember) {
    addmember.preventDefault();
    const memberDetails = {
      email: this.state.email,
      password: this.state.password,
      groupName: this.state.groupName,
      groupMember: this.state.groupMember
    };
    axios.post('/group/groupId/user', memberDetails)
      .then((response) => {
        alert(response.data.message);
        this.props.history.push('/Broadcastboard');
      })
      .catch((error) => {
        if (error.response) {
        }
      });
  }

  
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top"
          role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle"
                data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
                <span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="#">
                PostIt<small>App</small>
              </Link>
						</div>
						<div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="#">Home</Link></li>
                <li className="active"><Link to="Addmember">AddMember</Link></li>
                <li><Link to="/broadcastboard">Groups</Link></li>
								<li onClick={this.onClick}><Link to="/signout">Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
        <div className="container addmember">
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
										<label htmlFor="email">Member</label>
										<input value={this.state.member} onChange={this.onChange}
											id="member" type="text"
											className="googleform"
											name='member' required/>
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
										className="googleformbtn">Add Member
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
// Export AddMember
export default AddMember;
