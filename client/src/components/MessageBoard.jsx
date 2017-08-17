import React from 'react';

class MessageBoard extends React.Component {
    render(){
        return(
          <div className='container-fluid'>
            <div className='row content'>
                {/* <h4><small> RECENT POSTS</small></h4>
                <hr/>
                <h2> I love Food</h2>
                <h5><span className='glyphicon glypicon-time'></span>Post by Me.</h5>
                <h5><span className='label label-danger'></span><span
                className='label-label-primary'
                ></span></h5> */}
                <div className='chat_area'>
                  <ul className='list-unstyled'>
                    <li className='left clearfix'>
                      <hr/>
                    </li>
                  </ul>
                </div>
                  <div className="form-group">
                    <textarea className="form-control" rows="0.5"placeholder='type a message..'
                    required></textarea>
                  </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <br/><br/>
            </div>
          </div>
        );
    }
}
export default MessageBoard;
