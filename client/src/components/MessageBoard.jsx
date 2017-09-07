import React from 'react';

class MessageBoard extends React.Component {
    render(){
        return(
          <div className='container-fluid'>
            <div className='row content'>
                <div className='chat_area'>
                  <ul className='list-unstyled'>
                    <li className='left clearfix'>
                    <p> A message</p>
                      <hr/>
                    </li>
                  </ul>
                </div>
                  <div className="form-group">
                    <textarea className="form-control" rows="0.5"placeholder='type a message..'
                    required></textarea>
                  </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <label className="radio-inline">
                  <input type="radio" name="optradio"/>Option 1
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio"/>Option 2
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio"/>Option 3
                </label>
            </div>
          </div>
        );
    }
}
export default MessageBoard;
