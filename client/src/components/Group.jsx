import React from 'react';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import GroupList from './GroupList.jsx';

/**
 * @description creates a class group as a react component
 *
 * @class Group
 *
 * @param { object } event
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
      userId: localStorage.getItem('uid'),
      displayName: JSON.parse(localStorage.getItem('displayName')),
      group: '',
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
    AppActions.loadGroups(this.state.userId);
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
      group: event.target.value
    });
  }

  /**
   * @description This method fires action on button click
   *
   * @param { object } event
   *
   * @method onClick
   *
   * @return { void }
   *
   * @memberof Group
   */
  handleClick = (event) => {
    event.preventDefault();
    const groupDetail = {
      userId: this.state.userId,
      group: this.state.group,
      displayName: this.state.displayName

    };
    AppActions.createGroup(groupDetail)
      .then((res) => {
        if (res) {
          this.setState({
            group: '',
          });
        }
      });
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
  openCreateGroupModal = (event) => {
    event.preventDefault();
    const $myModal = $('#myModal');
    $myModal.modal({
      backdrop: false,
    });
  }
  /**
   * @return { jsx } rendered jsx element
   *
   * @memberof Group
   */
  render() {
    return (
      <div>
        <form id='group-form'>
          <h4 id="clear"><center> Group List</center><hr /></h4>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={this.openCreateGroupModal}
            data-toggle="myModal"
            data-target=".myModal2">
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
                  <h4 className="modal-title">
                    Create Group
                    </h4>
                </div>
                <div className="modal-body">
                  <input type="text"
                    className="form-control"
                    value={this.state.group}
                    onChange={this.onChange}
                    name="group"
                    placeholder="Input groupname...." />
                </div>
                <div className="modal-footer">
                  <button type="button"
                    className="btn btn-danger"
                    data-dismiss="modal" >
                    Close
                  </button>
                  <button type="button"
                    onClick={this.handleClick}
                    className="btn btn-success"
                    type="submit"
                    name="submit">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div >
            <div className="list-group">
              {
                this.state.groupName.map((KeyName, KeyIndex) =>
                  (<GroupList setGroupId={this.props.setGroupId}
                    KeyName={KeyName} key={KeyIndex} />))
              }
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Group;
