import React from 'react';

class UserList extends React.Component {
  render() {
    return (
        <div>
          <form id='userlist-form'>
            <h4><center> Members</center><hr/></h4>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search"/>
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>
      </div>
    );
  }
}
export default UserList;
