import React from 'react';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import MessageForm from '../components/MessageForm.jsx';
/**
 *
 * @class MessageBoard
 * @extends {React.Component}
 */
class MessageBoard extends React.Component {
/**
 * Creates an instance of MessageBoard.
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

  componentDidMount() {
    AppActions.loadMessage();
    AppStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    this.initialState = this.state;
    AppStore.removeChangeListener(this.onStoreChange);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupId: nextProps.groupId,
    });
  }

  onStoreChange() {
    this.setState({
      groupMessage: AppStore.getGroupMessage()
    });
  }
  handlePriority(event) {
    this.setState({ priority: event.target.value

    });
  }
  onChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const messageDetail = {
      message: this.state.message,
      priority: this.refs.type.value,
    };
    const groupId = this.state.groupId;
    if (groupId !== '') {
      AppActions.postMessage(messageDetail, groupId);
      AppActions.loadMessage(groupId);
    }
  }
  reset() {
    this.setState(this.initialState);
  }
/**
 *
 *
 * @returns
 * @memberof MessageBoard
 */
  render() {
    const messageList = this.state.groupMessage.map((groupMessage, index) => <li key ={index}>{groupMessage.text}</li>);
    console.log(messageList);
    return (
  <div>
     <MessageForm messageList = {messageList}/>
    <div id='message' className='container-fluid'>
      <form id ="messageboard" onSubmit={this.onSubmit}>
        <div className='row content'>
          <div id="message-box"className="form-group">
            <textarea className="form-control"
            rows="0.5"
            onChange={this.onChange}
            placeholder='type a message..'
            required></textarea>
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
