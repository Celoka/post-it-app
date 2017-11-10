import React from 'react';
import jwt from 'jsonwebtoken';
import AppActions from '../actions/AppActions';

/**
 * @description  creates a class message board as a react component
 *
 * @class MessageBoard
 *
 * @extends {React.Component}
 */
class MessageBoard extends React.Component {
/**
 * @description Creates an instance of MessageBoard
 *
 * @param { object } props
 *
 * @return { void }
 *
 * @memberof MessageBoard
 */
  constructor() {
    super();
    this.state = {
      message: '',
      groupId: '',
      groupName: '',
      groupMessage: [],
      displayName: jwt.decode(localStorage.token).displayName
    };
  }

/**
 * @description this receives props from the parent component(dashboard)
 *
 * @param { String } nextProps
 *
 * @method componentWillReceiveProps
 *
 * @return { void }
 *
 * @memberof MessageBoard
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groupId: nextProps.groupId,
      groupMessage: nextProps.groupMessage,
      groupName: nextProps.groupName
    });
  }

/**
 * @description this changes the state of the component
 * for a controlled input
 *
 * @param { String } event
 *
 * @method handlePriority
 *
 * @return { void }
 *
 * @memberof MessageBoard
 */
  handlePriority = (event) => {
    this.setState({
      priority: event.target.value
    });
  }
/**
 * @description changes the state of the component on input
 *
 * @param { String } event
 *
 * @method onChange
 *
 * @return { void }
 *
 * @memberof MessageBoard
 */
  onChange = (event) => {
    this.setState({
      message: event.target.value
    });
  }

/**
 * @description fires an action on click of a button
 *
 * @param { Object } event
 *
 * @method onSubmit
 *
 * @return { void }
 *
 * @memberof MessageBoard
 */
  onSubmit = (event) => {
    event.preventDefault();
    const messageDetail = {
      message: this.state.message,
      priority: this.refs.type.value,
      displayName: this.state.displayName
    };
    const groupId = this.state.groupId;
    if (groupId !== '') {
      AppActions.postMessage(messageDetail, groupId);
      this.state.message = '';
      this.refs.type.value = 'Normal';
    }
  }
/**
 * @return { jsx } rendered jsx element
 *
 * @memberof MessageBoard
 */
  render() {
    const messageList = this.state.groupMessage.map((groupMessage, index) =>
      <div key={index} className="row">
        <div className="col-sm-12">
          <div className="well">
            <div className="row">
              <div className="col-sm-9">
                <p id="message-text">{groupMessage.message}</p>
              </div>
              <div className="col-sm-3">
                <small>Priority level: <cite>{groupMessage.priority}</cite></small>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-9">
                <time id="time-tag">sent on: {groupMessage.timeStamp}</time>
              </div>
              <div className="col-sm-3">
                <small>sent by: {groupMessage.displayName}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <form id="message-display">
          <h1 className="group-title">
            Group Name: {this.props.groupName}
          </h1>
          {messageList}
        </form>
        <div id='message' className='container-fluid'>
          <form id="messageboard" onSubmit={this.onSubmit}>
            <div className="row">
              <div id="message-box" className="form-group">
                <textarea className="form-control"
                  value={this.state.message}
                  onChange={this.onChange}
                  placeholder='type a message..'
                  required>
                </textarea>
              </div>
              <button type="submit"
                className="btn btn-success">
                Submit
              </button>
              <select ref="type"
               style={{ color: 'black', float: 'left' }}
                className="select_btn">
                <option value='Normal'>Normal</option>
                <option value='Urgent'>Urgent</option>
                <option value='Critical'>Critical</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default MessageBoard;
