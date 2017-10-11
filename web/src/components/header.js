import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component{
	render(){
		return(
			<header className="App-header">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
          <h2>Fruit</h2>
					</div>
				</div>
			</div>
			</header>
		)
	}
}

export default Header
