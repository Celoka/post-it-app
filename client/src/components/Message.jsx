import React from 'react';

/**
 * @class Message
 * 
 * @extends {React.Component}
 */
class Message extends React.Component {
  
  /**
   * @description Creates an instance of Message
   * 
   * @param {any} props
   * 
   * @memberof Message
   */
  constructor(props) {
    super(props);
  }
  /**
   *
   * @returns
   * @memberof Message
   */
  render() {
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}
export default Message;
