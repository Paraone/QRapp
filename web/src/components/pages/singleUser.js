import React, {Component} from 'react';

import Upload from '../forms/upload';

class SingleUser extends Component{

  constructor(props){
    super(props);

    this.validate = this.validate.bind(this);
  }

  componentWillMount(){
    let token;
    if(document.cookie) token = document.cookie.split(';').filter((c)=> c.startsWith('token'))[0].split('=')[1];
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
          <Upload {...this.props} />
        </div> :
        <div>Loading user info...</div>
      }
      </div>
    );
  }
}

export default SingleUser;
