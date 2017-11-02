import React from 'react';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import GroupList from './GroupList.jsx';

/**
 * @description creates a class group as a react component
 *
 * @class Group
 *
 * @extends {React.Component}
 */
class Group extends React.Component {

/**
 * @param { Object } props
 *
 * @return { void }
 *
 * @memberof Group
 */
  constructor(props) {
    super(props);
    this.state = {
      userGroupName: '',
      groupName: []
    };
  }

/**
 * @description React life cycle method,
 * adds listens to change from the app store and
 * fires an action when the component mounts
 *
 * @method componentDidMount
 *
 * @return { void }
 *
 * @memberof Group
*/
  componentDidMount() {
    AppActions.loadGroups();
    AppStore.addChangeListener(this.onStoreChange);
  }
/**
 * @description React life cycle method,
 * removes change listener.
 *
 * @method componentWillUnmount
 *
 * @returns { void }
 *
 * @memberof Group
 *
*/
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onStoreChange);
  }
/**
 * @description this method gets all the user groups
 * from the store
 *
 * @method onStoreChange
 *
 * @return { Array } array of user groups
 *
 * @memberof Group
*/
  onStoreChange = () => {
    this.setState({
      groupName: AppStore.getUserGroup()
    });
  }

/**
 * @description this method gets all the user groups
 * from the store
 *
 * @param { String } event
 *
 * @returns { String } returns string for usergroup name
 *
 * @memberof Group
*/
  onChange = (event) => {
    this.setState({
      userGroupName: event.target.value
    });
  }

/**
 * @description This method fires action on button click
 *
 *
 * @method onClick
 *
 * @return { void }
 *
 * @memberof Group
 */
  onClick = () => {
    AppActions.createGroup(this.state.userGroupName);
    this.state.userGroupName = '';
    AppActions.loadGroups();
  }
/**
 * @return { jsx } rendered jsx element
 *
 * @memberof Group
 */
  render() {
    return (
      <div>
        <form onSubmit={this.onClick} id='group-form'>
          <h4><center> Group List</center><hr /></h4>
          <button id='modal-button'
            type="button"
            className="btn btn-success btn-block"
            data-toggle="modal"
            data-target=".create1">
            Create New Group
              <i className="material-icons">group_add</i>
           </button>
          <div className="modal fade create1"
            id="myModal"
            role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button"
                    className="close"
                    data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Create Group</h4>
                </div>
                <div className="modal-body">
                  <input type="text"
                    className="form-control"
                    value ={this.state.userGroupName}
                    onChange={this.onChange}
                    name="groupname"
                    placeholder="Input groupname...." />
                </div>
                <div className="modal-footer">
                  <button type="button"
                    className="btn btn-danger"
                    data-dismiss="modal" >
                    Close
                  </button>
                  <button type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={this.onClick}
                    type="submit" name="submit">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div >
            <div className="list-group">
              {this.state.groupName.map((KeyName, KeyIndex) =>
                 (<GroupList setGroupId={this.props.setGroupId}
                  KeyName={KeyName} key={KeyIndex} />))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Group;
