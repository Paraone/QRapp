import React, {Component} from 'react';

class Login extends Component{
  render(){
    return(
      <form className="form">
        <legend>Log In</legend>
        <fieldset>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" placeholder="username"/>
        </fieldset>
        <fieldset>
          <label htmlFor="email">E-mail:</label>
          <input type="email" name="email" placeholder="email"/>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="password"/>
        </fieldset>
        <fieldset>
          <input type="submit" value="Log In"/>
        </fieldset>
      </form>
    );
  }
}

export default Login;
