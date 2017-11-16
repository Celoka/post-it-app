import React from 'react';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';

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
      newMember: [],
      groupId: null
    };
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
   * @param { String } displayName
   *
   * @return { String } usersInGroup
   *
   * @method userValidation
   *
   * @memberof UsersInGroup
   */
  userValidation = (displayName) => {
    let usersInGroup;
    (this.props.userId).map((details) => {
      if (displayName === details.displayName) {
        usersInGroup = details.userId;
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
   * @param { string } event
   *
   * @returns { Boolean } true
   *
   * @memberof UsersInGroup
   */
  onClick = (event) => {
    event.preventDefault();
    if (!this.state.groupId) {
      this.setState({
        error: toastr.error('Click a group to add a member'),
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
        error: toastr.error('User does not exist or Invalid input'),
      });
    } else {
      AppActions.addUserToGroup(userDetails)
        .then((res) => {
          if (res) {
            this.setState({
              newUser: '',
            });
          }
        });
    }
  }
  /**
   * @description describes a function that dynamically
   * controls the behaviour of a modal
   *
   * @param { string } event
   *
   * @return { void }
   *
   * @memberof Group
   */
  openAddMemberModal = (event) => {
    event.preventDefault();
    const $myModal = $('#my-Modal');
    $myModal.modal({
      backdrop: false,
    });
  }
  /**
   * @return { jsx } rendered jsx element
   *
   * @memberof UsersInGroup
   */
  render() {
    const memberList = this.state.newMember.map((KeyName, KeyIndex) =>
      <div key={KeyIndex} className="list-group">
        <h5 id="member-list"> {KeyName.displayName} </h5>
      </div>
    );
    return (
      <div>
        <form id='userlist-form'>
          <h4 id="clear"><center>User List</center><hr /></h4>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={this.openAddMemberModal}
            data-toggle="my-Modal"
            data-target=".myModal2">
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
                    value={this.state.newUser}
                    onChange={this.onChange}
                    className="form-control"
                    name="username"
                    placeholder="Input username..." />
                </div>
                <div className="modal-footer">
                  <button type="button"
                    className="btn btn-danger"
                    data-dismiss="modal">
                    Close
                      </button>
                  <button type="button"
                    onClick={this.onClick}
                    className="btn btn-success"
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
