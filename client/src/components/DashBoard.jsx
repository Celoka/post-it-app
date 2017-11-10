import React from 'react';
import AppActions from '../actions/AppActions';
import Group from '../components/Group.jsx';
import AppStore from '../stores/AppStore';
import UsersInGroup from '../components/UsersInGroup.jsx';
import MessageBoard from '../components/MessageBoard.jsx';
import BoardNavigation from '../components/BoardNavigation.jsx';


/**
 * @description creates a class Dashboard as a react component
 *
 * @class DashBoard
 *
 * @extends {React.Component}
 */
class DashBoard extends React.Component {
  /**
   * @description Creates an instance of DashBoard.
   *
   * @param { Object } props
   *
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: null,
      groupName: '',
      groupMessage: [],
      userId: [],
      newMember: [],
      googleUser: null
    };
  }
  /**
   * @description A react life cycle method that listens to change
   * from the store,then fires an action. When component mounts,
   * it also fires an actions.
   *
   * @method componentDidMount
   *
   * @return { void }
   *
   * @memberof DashBoard
   */
  componentDidMount() {
    AppActions.getUsersInGroup();
    AppStore.addChangeListener(this.onStoreChange);
  }
/**
 * @description A react life cycle method that removes
 * change listener when component has been unmounted.
 *
 * @method componentWillUnmount
 *
 * @return { void }
 *
 * @memberof DashBoard
 */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onStoreChange);
  }

/**
 * @description this method gets data from the store and sets to state
 *
 * @method onStoreChange
 *
 * @return { void }
 *
 * @memberof DashBoard
 */
  onStoreChange = () => {
    this.setState({
      groupMessage: AppStore.getAllMessages(),
      userId: AppStore.getAllUsers(),
      newMember: AppStore.getNewMember(),
      googleUser: AppStore.getNewGoogleUser(),
    });
  }

/**
 * @description this method sets the groupId and groupName to state
 *
 * @method setGroupId
 *
 * @param { String } groupId
 * @param { String } groupName
 *
 * @return { void }
 *
 * @memberof DashBoard
 */
  setGroupId = (groupId, groupName) => {
    this.setState({
      groupId,
      groupName
    });
  }
/**
 * @return { jsx } rendered jsx element
 *
 * @memberof DashBoard
 */
  render() {
    return (
    <div id="background">
      <BoardNavigation googleUser={this.state.googleUser}/>
      <div className="container-fluid">
          <div id="profile" className="container">
            <div className="row">
            <div className="col-sm-12 col-md-3 leftsidenav">
              <Group setGroupId={this.setGroupId}/>
              <UsersInGroup groupId={this.state.groupId}
                userId={this.state.userId}
                newMember={this.state.newMember}/>
            </div>
            <div className="col-sm-12 col-md-9 ">
              {
                (this.state.groupId === null) ?
                <h1>WELCOME TO POSTIT</h1> :
                <MessageBoard groupId={this.state.groupId}
                  groupName={this.state.groupName}
                  groupMessage={this.state.groupMessage}/>
              }
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashBoard;
