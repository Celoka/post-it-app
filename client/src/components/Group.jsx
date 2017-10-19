import React from 'react';
import toastr from 'toastr';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import GroupList from './GroupList.jsx';

/**
 * @class Group
 * 
 * @extends {React.Component}
 */
class Group extends React.Component {
  /**
   * Creates an instance of Group.
   * 
   * @memberof Group
   */
  constructor() {
    super();
    this.state = {
      userGroupName: '',
      groupName: []
    };
  }

  /**
   * @description React life cycle method,
   * adds listens to change from the app store.
   * 
   * @memberof AppComponent
  */
  componentDidMount() {
    AppActions.loadGroups();
    AppStore.addChangeListener(this.onStoreChange);
  }
  /**
   * @description React life cycle method,
   * removes change listener.
   * 
   * @memberof AppComponent
   * @returns {void}
  */
  componentWillUnmount() {
    AppStore.removeChangeListener(this.onStoreChange);
  }
  /**
   *
   * @param {any} event
   * @memberof Group
  */
  onStoreChange =()=> {
    this.setState({
      groupName: AppStore.getUserGroup()
    });
  }

  onChange=(event)=> {
    this.setState({
      userGroupName: event.target.value
    });
  }

  /**
   *
   * @param {any} event
   * 
   * @memberof Group
   */
  onClick=()=> {
    AppActions.createGroup(this.state.userGroupName);
    AppActions.loadGroups();
  }

  /**
   * @memberof Group
   * 
   * @returns
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} id='group-form'>
          <h4><center> Group List</center><hr /></h4>
          <button id='modal-button' type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#myModal">
            Create New Group
              </button>
          <div className="modal fade"
            id="myModal"
            role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Create Group</h4>
                </div>
                <div className="modal-body">
                  <input type="text"
                    className="form-control"
                    onChange={this.onChange}
                    name="groupname"
                    placeholder="Input groupname...." />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger"
                    data-dismiss="modal" >Close</button>
                  <button type="button" className="btn btn-success"
                    data-dismiss="modal" onClick={this.onClick} type="submit" name="submit">
                    Create
                      </button>
                </div>
              </div>
            </div>
          </div>
          <div >
            <div className="list-group">
              {this.state.groupName.map((KeyName, KeyIndex) =>
                 (<GroupList setGroupId={this.props.setGroupId} KeyName={KeyName} key={KeyIndex} />))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Group;
