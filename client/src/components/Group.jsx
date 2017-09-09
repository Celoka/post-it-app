import React from 'react';
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

  render () {
    return (
      <div className="container">
      <h2>Activate Modal with JavaScript</h2>
 
      <button type="button"
       className="btn btn-info default"
       id="myBtn">
       Open Modal
       </button>

      <div className="modal fade"
       id="myModal"
       role="dialog">
        <div className="modal-dialog">
      
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
      
          </div>
        </div>
      </div>
  
    )
  }
}
export default Group;
