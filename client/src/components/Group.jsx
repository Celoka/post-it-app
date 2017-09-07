import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AppActions from '../actions/AppActions';


class Group extends React.Component {
  constructor() {
    super();
    this.state = {
      groupname: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    this.setState ({
      [event.target.name]: event.target.value
    });
  }
  onClick() {
    event.preventDefault();
    const groupDetail = {
      groupname: this.state.groupname
    };
    AppActions.createGroup(groupDetail)
    .then((res) => {
      console.log('I saved', res);
    },
    ({ response }) => {
      console.log('I failed', response);
    });
  }

  render() {
    return (
            <div id="groupnav" className= "form-group">
                <div className='dropdown'>
                  <button className='btn btn-primary dropdown-toggle'
                   type='button'
                  data-toggle='dropdown'>Groups<span className='caret'></span>
                  </button>
                  <ul className='dropdown-menu'>
                    <li><a href="#">My Groups</a></li>
                    <li>
                        <Modal.Dialog>
                          <Modal.Header>
                            <Modal.Title id="create group">Create Group</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              <div className="form-group">
                                <label htmlFor="groupname">Group Name:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="groupname"
                                  name="groupname"
                                  placeholder="Enter group name"
                                  value={this.state.groupname}
                                  onChange={this.onChange}
                                />
                                <label htmlFor="groupowner">Created By:</label>
                                <input type="text" className="form-control"
                                 id="groupowner" placeholder="Enter text..."/>
                              </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button>Close</Button>
                            <Button bsStyle="primary"
                              onClick={this.onClick}
                            >Submit</Button>
                          </Modal.Footer>
                        </Modal.Dialog>
                    </li>
                  </ul>
                </div>
            </div>
    );
  }
}
export default Group;
