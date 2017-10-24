import React from 'react';
import AppActions from '../actions/AppActions';

/**
 * @description a stateless component
 * that is a child of group.
 *
 * @return { jsx } rendered jsx element
 *
 * @function GroupList
 */
const GroupList = () => ({
  render() {
    return (
      <div onClick={() => {
        AppActions.getNewUsers(this.props.KeyName.groupId);
        AppActions.loadMessage(this.props.KeyName.groupId);
        this.props.setGroupId(this.props.KeyName.groupId,
          this.props.KeyName.groupname);
      }}>
          <h5 id ="style-group"className="list-group-item">
            {this.props.KeyName.groupname}
          </h5>
      </div>

    );
  }
});
export default GroupList;
