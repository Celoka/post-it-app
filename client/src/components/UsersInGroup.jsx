import React from 'react';
import lodash from 'lodash';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

class UsersInGroup extends React.Component {

  constructor() {
    super();
    this.state = {
      newUser: '',
      error: '',
      message:'',
      newMember:[]

     
    };
  }

componentWillMount() {
  AppStore.addChangeListener(this.onStoreChange);
}
componentWillUnmount() {
  AppStore.removeChangeListener(this.onStoreChange);
}
componentWillReceiveProps(nextProps) {
  this.setState({
    newMember: nextProps.newMember,
  });
}

onStoreChange =()=> {
  this.setState({
    message: AppStore.getAddMember(),
  })
}
onChange = (event) => {
  this.setState({
    newUser: event.target.value
  });
}
userValidation = (userName) => {
  let usersInGroup;
  (this.props.userId).map((data) => {
    if (userName === data.userNames) {
      usersInGroup = data.userId;
    } else  {
      return null;
    }
  });
  return usersInGroup;
}

onClick = () => {
  if (!this.props.groupId) {
    this.setState({
      error: toastr.error('Click a group to add a member'),
      newUser: ''
    })
    return true
  }
  const userDetails = {
    newUser: this.state.newUser,
    groupId: this.props.groupId,
    userId: this.userValidation(this.state.newUser)
  };
  if (!userDetails.userId) {
    this.setState({
      error: toastr.error('User does not exist'),
      newUser:''
    });
  } else {
  AppActions.addUserToGroup(userDetails);
  AppActions.getNewUsers(this.props.groupId)
  this.setState({
    newUser: ''
    })
  }
}
  render() {
    const memberList = this.state.newMember.map((newMember, index) =>
    <div key={index} className="list-group">
        <p id="member-list"> {newMember.userNames}</p>
    </div>
  )
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
                className="btn btn-success"
                data-toggle="modal"
                data-target=".modal2">
                Add User To Group
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
                      <h4 className="modal-title">Add Member</h4>
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
