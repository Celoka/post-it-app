import React from 'react';

import AppActions from '../../actions/AppActions';
import Group from '../container/Group';
import AppStore from '../../stores/AppStore';
import UsersInGroup from '../container/UsersInGroup';
import MessageBoard from '../container/MessageBoard';
import BoardNavigation from '../presentation/BoardNavigation';


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
      displayName: JSON.parse(localStorage.getItem('displayName')),
      groupId: null,
      groupName: '',
      groupMessages: [],
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
    AppActions.getAllUsers();
    AppStore.addChangeListener(this.onStoreChange);
    this.setState({
      groupId: localStorage.getItem('currentGroupId')
    });
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
      groupMessages: AppStore.getAllMessages(),
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
   * @param { String } groupId this contains group id of
   * a user group passed as props
   * @param { String } groupName this is the current group
   * name passed as props
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
        <BoardNavigation googleUser={this.state.googleUser}
          displayName={this.state.displayName} />
        <div className="container-fluid">
          <div id="profile" className="row">
            <div className="col-sm-12 col-md-3 leftsidenav">
              <Group setGroupId={this.setGroupId} />
              <UsersInGroup groupId={this.state.groupId}
                userId={this.state.userId}
                newMember={this.state.newMember} />
            </div>
            <div className="col-sm-12 col-md-9 ">
              {
                (this.state.groupId === null) ?
                  <div className="white-board black-text">
                    <img height="25px" id="mail-box"
                      src=
                      "http://res.cloudinary.com/dnsteufwj/image/upload/v1510496726/mssg_qswl1m.png"
                      alt="message" />
                    <h4 id="clear">
                      <span className="caps">
                        Welcome, {this.state.displayName}
                      </span>
                    </h4>
                    <h6 id="clear">
                      You Currently have no group selected.
                        Please pick one by clicking on the
                        <br /><br /> group on the
                        left window pane to access the
                        group options or create one.
                      </h6>
                  </div> :
                  <MessageBoard groupId={this.state.groupId}
                    groupName={this.state.groupName || localStorage.getItem('GroupName')}
                    groupMessages={this.state.groupMessages} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashBoard;
