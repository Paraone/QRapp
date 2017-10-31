import React, {Component} from 'react';

class Login extends Component{

  submit(e){
    e.preventDefault();
    const {username: {value: username},
            password: {value: password}} = this;
    this.props.login({username, password});
  }

  render(){
    return(
      <form onSubmit={(e)=> this.submit(e)} className="form">
        <legend>Log In</legend>
        <fieldset>
          <label htmlFor="username">Username:</label>
          <input ref={(input) => this.username = input} type="text" name="username" placeholder="username"/>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input ref={(input) => this.password = input} type="password" name="password" placeholder="password"/>
        </fieldset>
        <fieldset>
          <input type="submit" value="Log In"/>
        </fieldset>
      </form>
    );
  }
}

export default Login;
