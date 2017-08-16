import React from 'react';

/**
 * @class Message
 * @extends {React.Component}
 */
class Message extends React.Component {
  /**
   * Creates an instance of Message.
   * @param {any} props
   * @memberof Message
   */
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>{this.props.message}</div>
    );
  }
}
export default Message;
