import React from 'react';

class Group extends React.Component{
    render(){
        return(
            <div>
              {/* <ul className='nav nav-pills nav-stacked'> */}
                <div className='dropdown'>
                  <button className='btn btn-primary dropdown-toggle' type='button'
                  data-toggle='dropdown'>Groups<span className='caret'></span></button>
                  <ul className='dropdown-menu'>
                    <li><a href="#">My Groups</a></li>
                    <li>
                        <h5 data-toggle="modal" data-target="#creategroup"><a href="#">Create Group</a></h5>
                        
                        <div className="modal fade" id="myModal" role="dialog">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-tittle"></h4>
                              </div>
                              <div>
                                <p> Some text in the modal.</p>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> 
                              </div>
                            </div>
                          </div>
                        </div>
                    </li>
                  </ul>
                </div>
              {/* </ul><br/> */}
            </div>
        );
    }
}
export default Group;