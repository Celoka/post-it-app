import React from 'react';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import MessageForm from '../components/MessageForm.jsx';
/**
 *
 * @class MessageBoard
 * 
 * @extends {React.Component}
 */
class MessageBoard extends React.Component {
  /**
   * @description Creates an instance of MessageBoard
   * 
   * @memberof MessageBoard
   */
  constructor() {
    super();
    this.state = {
      message: '',
      groupMessage: [],
      groupId: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  /**
   * 
   * @memberof MessageBoard
   */
  componentDidMount() {
    AppActions.loadMessage();
    AppStore.addChangeListener(this.onStoreChange);
  }

  /**
   * @memberof MessageBoard
   */
  componentWillUnmount() {
    this.initialState = this.state;
    AppStore.removeChangeListener(this.onStoreChange);
  }

  /**
   * @description this receives props from the parent component
   * 
   * @param {any} nextProps 
   * 
   * @memberof MessageBoard
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groupId: nextProps.groupId,
    });
  }

  /**
   * @description gets the message from the store
   * @memberof MessageBoard
   */
  onStoreChange() {
    this.setState({
      groupMessage: AppStore.getGroupMessage()
    });
  }
  /**
   * @param {any} event 
   * 
   * @memberof MessageBoard
   */
  onChange(event) {
    this.setState({
      message: event.target.value
    });
  }
  /**
   * @param {any} event
   *  
   * @memberof MessageBoard
   */
  onSubmit(event) {
    event.preventDefault();
    const messageDetail = {
      message: this.state.message,
      priority: this.refs.type.value,
    };
    const { text, type } = this.refs;
    const groupId = this.state.groupId;
    if (groupId !== '') {
      AppActions.postMessage(messageDetail, groupId);
      AppActions.loadMessage(groupId);
      text.value = '';
      type.value = 'Normal';
    }
  }
  /**
   * @memberof MessageBoard
   * 
   * @returns {any} This returns the rendered component
   */
  render() {
   
    const messageList = this.state.groupMessage.map((groupMessage, index) =>
      <div key={index} className="row">
        <div className="col-md-12"><div className="well"><p id="message-text">{groupMessage.text}</p></div></div>
      </div>
    );
    return (
      <div>
        <MessageForm groupname={this.props.groupname} messageList={messageList} />
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
              <select ref="type" style={{ color: 'black', float: 'left' }} className="select_btn">
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
