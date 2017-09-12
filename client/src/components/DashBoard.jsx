import React from 'react';
import Group from '../components/Group.jsx';
import UserList from '../components/UserList.jsx';
import MessageBoard from '../components/MessageBoard.jsx';
import BoardNavigation from '../components/BoardNavigation.jsx';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';


/**
 *
 * @class DashBoard
 * @extends {React.Component}
 */
class DashBoard extends React.Component {

  /**
   * Creates an instance of DashBoard.
   * @memberof DashBoard
   */
  constructor() {
    super();
    this.state = {
      groupname: '',
      user: AppStore.getStatus()
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   *
   * @param {any} event
   * @memberof DashBoard
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   * @memberof DashBoard
   */
  onClick() {
    event.preventDefault();
    const groupDetail = {
      groupname: this.state.groupname
    };
    AppActions.createGroup(groupDetail);
  }
  /**
   *
   * @return {BoardNavigation, Group, MessageBoard, UserList}
   * @memberof DashBoard
   */
  render() {
    return (
          <div>
            <BoardNavigation />
            <div className="container-fluid">
                <div id= 'profile' className="row">
                  <div className="col-md-3 leftsidenav">
                    <Group/>
                  </div>
                  <div className="col-md-6 middleboard">
                    <MessageBoard />
                  </div>
                  <div className="col-md-3 rightsidenav">
                    <UserList />
                  </div>
                </div>
              </div>
            </div>
    );
  }
}
export default DashBoard;
