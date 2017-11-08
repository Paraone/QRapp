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
  }

  componentWillMount(){
    let token;
    if(document.cookie) {
      token = document.cookie.split(';').filter( c => c.startsWith('token'))[0].split('=')[1];
      this.props.validate({token}, this.props.showAlert);
    }
  }

  setForm(form){
    this.props.setForm(form);
  }

  submit(e){
    e.preventDefault();

    let {file} = this;

    this.props.uploadFile(file);

  }

  validate(token){
    this.props.validate(token, this.props.showAlert);
  };

  render(){
    const {form} = this.props.home;
    const {token, id, username} = this.props.user;

    return(
      <div className="container home">
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
      </div>
    );
  }
}

export default Home;
