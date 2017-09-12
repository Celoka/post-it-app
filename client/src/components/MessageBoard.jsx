import React from 'react';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

class MessageBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      priority: '',
      groupMessage: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    AppActions.loadMessages();
    AppStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.onStoreChange);
  }
  onStoreChange() {
    this.setState({
      groupMessage: AppStore.getGroupMessage
    });
  }
  handlePriority(event) {
    this.setState({ priority: event.target.value

    });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const messageDetail = {
      message: this.state.message,
      priority: this.state.priority,
    };
    AppActions.postMessage(messageDetail);
  }

  render() {
    return (
          <div id='message' className='container-fluid'>
          <form id ="messageboard" onSubmit={this.onSubmit}>
            <div className='row content'>
                <div className='chat_area'>
                </div>
                  <div className="form-group">
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
                <label className="radio-inline">
                  <input type="radio" name="optradio"/>Normal
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio"/>Urgent
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio"/>Critical
                </label>
            </div>
          </form>
          </div>
    );
  }
}
export default MessageBoard;
