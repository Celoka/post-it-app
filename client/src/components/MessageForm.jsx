import React from 'react';

const MessageForm = () => ({
  render() {
    return (
      <div>
        <form id="message-display">
           {this.props.messageList}
        </form>
      </div>
    );
  }
});

export default MessageForm;
