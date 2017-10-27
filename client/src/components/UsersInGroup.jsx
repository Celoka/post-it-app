import React from 'react';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';


/**
 * @description creates a class users in a particular
 * group as a react component
 *
 * @class UsersInGroup
 *
 * @extends { React.Component }
 */
class UsersInGroup extends React.Component {

/**
 * @param { object } props
 *
 * @return { void }
 *
 * @memberof UsersInGroup
 */
  constructor(props) {
    super(props);
    this.state = {
      newUser: '',
      error: '',
      message: '',
      newMember: [],
      groupId: null
    };
  }
/**
 * @description Adds an event Listener to listen to the Store and fires when
 * there is a change component is fully mounted.
 *
 * @method componentDidMount
 *
 * @return { void }
 *
 * @memberof UsersInGroup
 */
  componentDidMount() {
    AppStore.addChangeListener(this.onStoreChange);
  }

/**
 * @description Removes the event Listener after the component has been mounted.
 *
 * @method componentWillUnmount
 *
 * @return { void }
 *
 * @memberof UsersInGroup
 */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onStoreChange);
  }
/**
 * @description This receives props from a parent component and
 * sets it to the state.
 *
 * @param { Array } nextProps
 *
 * @method componentWillReceiveProps
 *
 * @return { void }
 *
 * @memberof UsersInGroup
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      newMember: nextProps && nextProps.newMember,
      groupId: nextProps.groupId
    });
  }
/**
 * @description fetches a member object from the store
 *
 * @method onStoreChange
 *
 * @return { void }
 *
 * @memberof UsersInGroup
 */
  onStoreChange = () => {
    this.setState({
      message: AppStore.getAddMember(),
    });
  }
/**
 * @description Monitors changes in the components and changes state
 *
 * @param { String } event
 *
 * @method onChange
 *
 * @return { void }
 *
 * @memberof UsersInGroup
 */
  onChange = (event) => {
    this.setState({
      newUser: event.target.value
    });
  }

/**
 * @description This method validates the input string
 *
 * @param { String } userName
 *
 * @return { String } usersInGroup
 *
 * @method userValidation
 *
 * @memberof UsersInGroup
 */
  userValidation = (userName) => {
    let usersInGroup;
    (this.props.userId).map((data) => {
      if (userName === data.userNames) {
        usersInGroup = data.userId;
      } else {
        return null;
      }
    });
    return usersInGroup;
  }

/**
 * @description When all conditions have been met,
 * this method fires an action
 *
 * @method onClick
 *
 * @returns { Boolean } true
 *
 * @memberof UsersInGroup
 */
  onClick = () => {
    if (!this.state.groupId) {
      this.setState({
        error: toastr.error('Click a group to add a member'),
        newUser: ''
      });
      return true;
    }
    const userDetails = {
      newUser: this.state.newUser,
      groupId: this.state.groupId,
      userId: this.userValidation(this.state.newUser)
    };
    if (!userDetails.userId) {
      this.setState({
        error: toastr.error('User does not exist'),
        newUser: ''
      });
    } else {
      AppActions.addUserToGroup(userDetails);
      AppActions.getNewUsers(this.props.groupId);
      this.setState({
        newUser: ''
      });
    }
  }
/**
 * @return { jsx } rendered jsx element
 *
 * @memberof UsersInGroup
 */
  render() {
    const memberList = this.state.newMember.map((newMember, index) =>
    <div key={index} className="list-group">
        <p id="member-list"> {newMember.userNames} </p>
    </div>
  );
    return (
      <div>
        <form id='userlist-form'>
            <h4>
              <center>
                User List
              </center>
              <hr/>
            </h4>
            <button type="button"
                className="btn btn-success btn-block"
                data-toggle="modal"
                data-target=".modal2">
                Add User To Group
               <i className="material-icons">person_add</i>
            </button>
            <div className="modal fade modal2"
              id="my-Modal"
                role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button"
                        className="close"
                        data-dismiss="modal">
                        &times;
                      </button>
                      <h4 className="modal-title">
                        Add Member
                      </h4>
                    </div>
                    <div className="modal-body">
                      <input type="text"
                      onChange={this.onChange}
                      className="form-control"
                      name="username"
                      placeholder="Input username..." />
                    </div>
                    <div className="modal-footer">
                      <button type="button"
                        className="btn btn-danger"
                         data-dismiss="modal">Close
                      </button>
                      <button type="button"
                          onClick={this.onClick}
                          className="btn btn-success"
                          data-dismiss="modal"
                          type="submit"
                          name="submit">
                         Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {memberList}
              </div>
        </form>
      </div>
    );
  }
}
export default UsersInGroup;
