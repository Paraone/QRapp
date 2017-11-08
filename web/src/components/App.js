import React, { Component } from 'react';
import '../bootstrap.css';
import '../App.css';
import Header from './header';
import AlertContainer from 'react-alert';



class App extends Component {

  constructor(props){
    super(props);

    this.showAlert = this.showAlert.bind(this);

    this.alertOptions = {
      offset: 14,
      position: 'top center',
      theme: 'dark',
      time: 2000,
      transition: 'scale'
    };
  }

  showAlert(msg, cb, type = 'show'){
    this.alert[type](msg, {
      onClose: ()=>{if(cb) return cb()}
    })
  };

  render() {
    return (
      <div className="App container-fluid">
        <AlertContainer ref={(s)=> this.alert = s} {...this.alertOptions} />
		    <Header {...this.props} showAlert={this.showAlert}/>
        {React.cloneElement(this.props.children, {...this.props, showAlert: this.showAlert})}
      </div>
    );
  }
}

export default App;
