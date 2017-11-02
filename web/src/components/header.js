import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component{

  constructor(){
    super();
  }

  logout(id){
    this.props.logout(id);
  }

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
            <ul className="list-inline col-md-6">
              <li className="">
              <Link to={`/users/${id}`}>My Account</Link>
              </li>
    					<li className="">
              <span className="btn" style={{color: 'black'}} onClick={() => this.logout(id)}>Logout</span>
    					</li>
            </ul>
          }
				</div>
			</div>
			</header>
		)
	}
}

export default Header
