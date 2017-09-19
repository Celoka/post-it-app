import React from 'react';
import AppActions from '../actions/AppActions';

class UserList extends React.Component {

  render() {
    return (
      <div onClick={() => {
        AppActions.loadMessage(this.props.KeyName.groupId);
        this.props.setGroupId(this.props.KeyName.groupId);
      }}>
        <li><a>{this.props.KeyName.groupname}</a></li>
      </div>
    );
  }
}
export default UserList;
