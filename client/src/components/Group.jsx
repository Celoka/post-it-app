import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class Group extends React.Component {

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
                                <label for="groupname">Group Name:</label>
                                <input type="text" className="form-control"
                                 id="groupname" placeholder="Enter group name"/>
                                <label for="groupowner">Created By:</label>
                                <input type="text" className="form-control"
                                 id="groupowner" placeholder="Enter text..."/>
                              </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button>Close</Button>
                            <Button bsStyle="primary">Submit</Button>
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
