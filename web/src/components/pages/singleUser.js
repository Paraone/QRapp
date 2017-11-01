import React, {Component} from 'react';

class SingleUser extends Component{

  constructor(props){
    super(props);

    this.validate = this.validate.bind(this);
  }

  componentWillMount(){
    console.log('cookie', document.cookie);
    let token = document.cookie.split(';').filter((c)=> c.startsWith('token'))[0].split('=')[1];
    console.log('token', token);

    this.props.validate({token});
  }

  validate(mytoken){
    this.props.validate(mytoken);
  };

  render(){
    const {id, username, token} = this.props.user;
    return(
      <div className="container user">
      {id ?
        <div>
          <div>{`id: ${id}`}</div>
          <div>{`username: ${username}`}</div>
          <div className='btn' onClick={()=> {this.validate({token})}} >Validate</div>
        </div> :
        <div>Loading user info...</div>
      }
      </div>
    );
  }
}

export default SingleUser;
