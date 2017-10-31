import React, {Component} from 'react';
import AlertContainer from 'react-alert';

import Login from '../forms/login';
import Register from '../forms/register';

class Home extends Component{

  constructor(props){
    super(props);

    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
    this.setForm = this.setForm.bind(this);

    this.alertOptions = {
      offset: 14,
      position: 'top center',
      theme: 'dark',
      time: 2000,
      transition: 'scale'
    };
  }

  setForm(form){
    this.props.setForm(form);
  }

  submit(e){
    e.preventDefault();

    let {file} = this;

    this.props.uploadFile(file);

  }

  showAlert = ()=>{
    this.alert.success('alert success!', {
      onClose: () =>{this.alert.info('alert info!',{
        onClose: () =>{this.alert.error('alert error!')}
      })}
    })
  };

  validate(mytoken){
    console.log('validate->token:', mytoken);
    this.props.validate(mytoken);
  };

  render(){
    const {form} = this.props.home;
    const {token} = this.props.user;
    console.log('render->token:', token)

    return(
      <div className="container home">
        <AlertContainer ref={(s)=> this.alert = s} {...this.alertOptions}></AlertContainer>
        {form === 'login' &&
          <div>
            <Login {...this.props} />
            Not a member? <span className="btn" onClick={() => {this.setForm('register')}}>Create Account</span>
          </div>

        }
        {form === 'register' &&
          <div>
            <Register {...this.props} />
            Already a member? <span className="btn" onClick={() => {this.setForm('login')}}>Log In</span>
          </div>
        }
        <div className='btn' onClick={()=> {this.validate({token})}} >Validate</div>
      </div>
    );
  }
}

export default Home;
