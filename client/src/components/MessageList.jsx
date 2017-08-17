import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  /**
   * Creates an instance of MessageList.
   * @param {any} props
   * @memberof MessageList
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  render() {
    const messageNodes = this.state.messages.map((message) => (
        <Message message={message} />
      ));
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type= "text" className="form control" ref="text" placeholder="please type a message....."/>
        </form>
        { messageNodes }
      </div>
    );
  }
}
export default MessageList;
