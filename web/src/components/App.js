import React, { Component } from 'react';
import '../bootstrap.css';
import '../App.css';
import Header from './header';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
		    <Header {...this.props} />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default App;
