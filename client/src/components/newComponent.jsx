import React from 'react';


class newComponent extends React.Component{

  render(){
    return(
    <div>
      <nav className="navbar navbar-default">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle"
								data-toggle="collapse" data-target=".navbar-collapse">
								 <span className="sr-only">Toggle navigation</span>
							</button>
							<a href='/broadcastboard'className="navbar-brand">
                Post It
              </a>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								{/* <li onClick={this.logout}><Link to='/user/signout'>Sign out</Link></li> */}
                <li><span className="glyphicons glyphicons-user"></span></li>
                {/* <li><Link to='/user/signout' onClick={this.logout}>Sign Out</Link></li> */}
							</ul>
						</div>
					</div>
        </nav>
        
    </div>
    );
  }
}
export default newComponent;