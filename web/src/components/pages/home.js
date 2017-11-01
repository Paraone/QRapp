import React, {Component} from 'react';
import {Link} from 'react-router';
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

  componentWillMount(){
    let token;
    if(document.cookie) token = document.cookie.split(';').filter( c => c.startsWith('token'))[0].split('=')[1];
    this.props.validate({token});
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
    this.props.validate(mytoken);
  };

  render(){
    const {form} = this.props.home;
    const {token, id, username} = this.props.user;

    return(
      <div className="container home">
        <AlertContainer ref={(s)=> this.alert = s} {...this.alertOptions}></AlertContainer>
        {!id ?
          <div>
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
          </div> :
          <div>
            <div>Welcome <Link to={`/users/${id}`}>{username}</Link>!</div>
          </div>
        }
        <div className='btn' onClick={()=> {this.validate({token})}} >Validate</div>
      </div>
    );
  }
}

export default Home;
