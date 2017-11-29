import React from 'react';

import AppActions from '../../actions/AppActions';

/**
 * @description a stateless component
 * that is a child of group. Displays
 * the group name to the browser. An
 * onclick method is created to make API
 * calls for needed data.
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
        AppActions.loadGroupMessage(this.props.KeyName.groupId);
        this.props.setGroupId(this.props.KeyName.groupId,
          this.props.KeyName.groupName);
        localStorage.setItem('currentGroupId',
          this.props.KeyName.groupId);
        localStorage.setItem('Groupname',
          this.props.KeyName.groupName);
      }}>
        <h5 id="style-group" className="list-group-item">
          {this.props.KeyName.groupName}
        </h5>
      </div>

    );
  }
});
export default GroupList;
