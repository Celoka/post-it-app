import React from 'react';
import AppActions from '../actions/AppActions';

class UserList extends React.Component {

  render() {
    return (
      <div onClick={() => {
          AppActions.loadMessage(this.props.KeyName.groupId);
          this.props.setGroupId(this.props.KeyName.groupId,
          this.props.KeyName.groupname);
        }}>
          <h5 className="list-group-item" >{this.props.KeyName.groupname}</h5>
      </div>
     
    );
  }
}
export default UserList;
