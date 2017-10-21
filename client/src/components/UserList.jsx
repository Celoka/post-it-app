import React from 'react';

const UserList =()=> ({
  render() {
    return (
      <div>
        <form id="message-display">
           {this.props.userNames}
        </form>
      </div>
    );
  }
});
export default UserList;
