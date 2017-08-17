import React from 'react';

import Group from '../components/Group.jsx';
import UserList from '../components/UserList.jsx';
import MessageBoard from '../components/MessageBoard.jsx';
import BoardNavigation from '../components/BoardNavigation.jsx';

class DashBoard extends React.Component {
    render(){
        return(
          <div>
            <BoardNavigation />
            <div>
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
          </div>
        );
    }
}
export default DashBoard;
