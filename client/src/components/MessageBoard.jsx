import React from 'react';
import AppActions from '../actions/AppActions';
import MessageForm from '../components/MessageForm.jsx';

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
      groupname:'',
      groupMessage: []
    };
  }

/**
 * @description this receives props from the parent component(dashboard)
 * 
 * @param { String } nextProps 
 * 
 * @method componentWillReceiveProps
 * 
 * @memberof MessageBoard
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groupId: nextProps.groupId,
      groupMessage: nextProps.groupMessage,
      groupname: nextProps.groupname
    });
  }

/**
 * @description gets the message from the store
 * 
 * @param { void } 
 * 
 * @method onStoreChange
 * 
 * @memberof MessageBoard
 */
  onStoreChange = () => {
    this.setState({
      groupMessage: AppStore.getAllMessages(),
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
 * @memberof MessageBoard
 */
  handlePriority=(event)=> {
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
 * @memberof MessageBoard
 */
  onChange=(event)=> {
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
 * @memberof MessageBoard
 */
  onSubmit = (event) => {
    event.preventDefault();
    const { text, type } = this.refs;
    const messageDetail = {
      message: this.state.message,
      priority: this.refs.type.value,
    };
    const groupId = this.state.groupId;
    if (groupId !== '') {
      AppActions.postMessage(messageDetail, groupId);
      text.value = '';
      type.value = 'Normal';
    }
  }
render() {
    const messageList = this.state.groupMessage.map((groupMessage,index) =>
      <div key={index} className="row">
        <div className="col-sm-12">
          <div className="well">
            <p id="message-text">{groupMessage.message}</p>
            <time id="time-tag">{groupMessage.time}</time>
          </div>
        </div>
      </div>
    );
  return (
      <div>
        <MessageForm groupname={this.state.groupname}
          messageList={messageList} />
        <div id='message' className='container-fluid'>
          <form id="messageboard" onSubmit={this.onSubmit}>
            <div className='row content'>
              <div id="message-box" className="form-group">
                <textarea className="form-control"
                  ref="text"
                  rows="0.5"
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
