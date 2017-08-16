import React from 'react';

class UserList extends React.Component {
    render(){
        return (
          <div>
              <h4></h4>
              <ul className='nav nav-pills nav-stacked'>
                <li className='active'><a href=''>Users</a></li>
              </ul><br/>
              <div className='input-group'>
                <input type='text' className='form-control' placeholder='search member..' />
                <span className='input-group-btn'>
                  <button className='btn btn-default' type='button' >
                    <span className='glyphicon glyphicon-search'></span>
                  </button>
                </span>
              </div>
          </div>
        );
    }
}
export default UserList;