import React from 'react';


/**
 * Creates a messageform component
 * @function Footer
 * @export
 * @returns {any} - MessageForm component
 */
class MessageForm extends React.component {
  render() {
    return(
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type= "text" className="form control" ref="text" placeholder="please type a message....."/>
        </form>
      </div>
    )
  }
  onSubmit(e){
    e.preventDefault();

    this.props.emit('messageAdded', {
      timeStamp: Date.now(),
      text: this.ref.text.value.trim()
    });
    /**
     * clear Form
     */
    this.ref.text.value ='',
  }
}
export default MessageForm
