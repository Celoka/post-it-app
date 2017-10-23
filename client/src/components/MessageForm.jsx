import React from 'react';
/**
 * @description a stateless component
 *  that is a child of message board
 * 
 * @returns {void}
 */
const MessageForm = () => ({
  render() {
    return (
      <div>
        <form id="message-display">
          <h1>{this.props.groupname}</h1>
          {this.props.messageList}
        </form>
      </div>
    );
  }
});

export default MessageForm;