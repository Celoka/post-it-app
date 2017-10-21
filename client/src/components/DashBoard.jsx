import React from 'react';
import AppActions from '../actions/AppActions';
import Group from '../components/Group.jsx';
import AppStore from '../stores/AppStore';
import UsersInGroup from '../components/UsersInGroup.jsx';
import MessageBoard from '../components/MessageBoard.jsx';
import BoardNavigation from '../components/BoardNavigation.jsx';


/**
 * @class DashBoard
 * 
 * @extends {React.Component}
 */
class DashBoard extends React.Component {
  /**
   * @description Creates an instance of DashBoard.
   * 
   * @param {any} props 
   * 
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: null,
      groupname: '',
      groupMessage: [],
      userId: [],
      newMember: []
    };
  }
  componentDidMount() {
    AppActions.getUsersInGroup();
    AppStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange = () => {
    this.setState({
      groupMessage: AppStore.getAllMessages(),
      userId: AppStore.getAllUsers(),
      newMember: AppStore.getNewMember()
    });
  }

  setGroupId = (groupId, groupname) => {
    this.setState({
      groupId,
      groupname
    });
  }

  render() {
    return (
    <div>
      <BoardNavigation />
      <div className="container-fluid">
          <div id= 'profile' className="row">
            <div className="col-sm-3 leftsidenav">
              <Group setGroupId={this.setGroupId}/>
              <UsersInGroup groupId={this.state.groupId}
                userId={this.state.userId}
                newMember={this.state.newMember}/>
            </div>
            <div className="<col-sm-12></col-sm-12> middleboard">
              {
                (this.state.groupId === null) ?
                <h1>WELCOME TO POSTIT</h1> :
                <MessageBoard groupId={this.state.groupId}
                  groupname={this.state.groupname}
                  groupMessage={this.state.groupMessage}/>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashBoard;
