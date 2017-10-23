import React from 'react';

/**
 * @description a stateless component
 * that is a child of message board. The
 * message list and groupname are rendered to the screen
 * in this component
 *
 * @return { void }
 *
 * @function MessageForm
 */
const MessageForm = () => ({
  render() {
    return (
      <div>
        <form id="message-display">
          <h1>
            {this.props.groupname}
          </h1>
          {this.props.messageList}
        </form>
      </div>
    );
  }
});

export default MessageForm;
