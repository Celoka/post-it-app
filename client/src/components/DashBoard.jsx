import React from 'react';
import Group from '../components/Group.jsx';
import UserList from '../components/UserList.jsx';
import MessageBoard from '../components/MessageBoard.jsx';
import BoardNavigation from '../components/BoardNavigation.jsx';


/**
 * @class DashBoard
 * @extends {React.Component}
 */
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
    };
    this.setGroupId = this.setGroupId.bind(this);
  }

  setGroupId(groupName) {
    this.setState({
      groupId: groupName
    });
  }
  render() {
    return (
    <div>
      <BoardNavigation />
      <div className="container-fluid">
          <div id= 'profile' className="row">
            <div className="col-md-3 leftsidenav">
              <Group setGroupId={this.setGroupId}/>
              <UserList />
            </div>
            <div className="col-md-6 middleboard">
              <MessageBoard groupId={this.state.groupId}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashBoard;
