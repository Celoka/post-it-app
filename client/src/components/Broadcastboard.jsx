import React from 'react';
import { BrowserRouter, Link, browserHistory } from 'react-router-dom';
import axios from 'axios';
import BoardNavBar from '../components/BoardNavBar.jsx';
// import BroadcastgroupList from './userBroadCastBoardGroupList.jsx';


class Broadcastboard extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onClick = this.onClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  onChange(message) {
    this.setState({
      [message.target.name]: message.target.value
    });
  }

  onSubmit(message) {
    message.preventDefault();
    const broadcastmessage = {
      message: this.state.message
    };
    axios.post('/groupName/message', broadcastmessage).then(() => {
      alert('message sent');
    });
  }

  logout(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    browserHistory.replace('/');
    location.reload();
  }
	
  // onClick() {
  //   axios.post('/signout').then((response) => {
  //     alert(response.data.message);
  //     this.props.history.push('/');
  //   }).catch((error) => {
  //     if (error.response) {
  //     }
  //   });
  // }
	
  render() {
    return (
			<div>
        <nav className="navbar navbar-default">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle"
								data-toggle="collapse" data-target=".navbar-collapse">
								 <span className="sr-only">Toggle navigation</span>
							</button>
							<Link to='/broadcastboard'className="navbar-brand">
                Post It
              </Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								{/* <li onClick={this.logout}><Link to='/user/signout'>Sign out</Link></li> */}
                <li><span className="glyphicons glyphicons-user"></span></li>
                <li><Link to='/user/signout' onClick={this.logout}>Sign Out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
				<BoardNavBar />
				<div className="container">
					<div className="col-md-12">
						<div className="row board">
							<div className="col-md-3">
								<h5 className="text-center para">Groups</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

// Export BroadCastBoard Component
export default Broadcastboard;
