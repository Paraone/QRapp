import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component{
	render(){
    const {id} = this.props.user;
		return(
			<header className="App-header">
			<div className="container">
				<div className="row">
          <div className="col-md-6">
          <h2><Link to="/">Home</Link></h2>
          </div>
          {id &&
  					<div className="col-md-6">
            <Link to={`/users/${id}`}>My Account</Link>
  					</div>
          }
				</div>
			</div>
			</header>
		)
	}
}

export default Header
