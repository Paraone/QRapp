import React, {Component} from 'react';

class Register extends Component{

  constructor(props){
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(e){
    e.preventDefault();
    const {form, username, email, password, confirm} = this;
    this.props.createUser({username: username.value, email: email.value, password: password.value});
  }

  render(){
    return(
      <form ref={input => this.form = input} onSubmit={(e) => this.submit(e)} className="form">
        <legend>Create Account</legend>
        <fieldset>
          <label htmlFor="username">Username:</label>
          <input ref={input => this.username = input} type="text" name="username" placeholder="username"/>
        </fieldset>
        <fieldset>
          <label htmlFor="email">E-mail:</label>
          <input ref={input => this.email = input} type="email" name="email" placeholder="email"/>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input ref={input => this.password = input} type="password" name="password" placeholder="password"/>
        </fieldset>
        <fieldset>
          <label htmlFor="confirm">Confirm Password:</label>
          <input ref={input => this.confirm = input} type="password" name="confirm" placeholder="confirm password"/>
        </fieldset>
        <fieldset>
          <input type="submit" value="Create Account"/>
        </fieldset>
      </form>
    );
  }
}

export default Register;
