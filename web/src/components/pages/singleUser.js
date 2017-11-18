import React, {Component} from 'react';
import {Link} from 'react-router';

import Upload from '../forms/upload';

class SingleUser extends Component{

  constructor(props){
    super(props);

    this.download = this.download.bind(this);
  }

  componentWillMount(){
    let token;
    if(document.cookie) token = document.cookie.split(';').filter((c)=> c.startsWith('token'))[0].split('=')[1];
    this.props.validate({token}, this.props.showAlert);
  }

  download(file, mimetype){
    this.props.download(file, mimetype, this.props.user, this.props.showAlert);
  };

  render(){
    const {id, username, token, files, download} = this.props.user;
    return(
      <div className="container user">
      {id ?
        <div>
          <div>{`username: ${username}`}</div>
          <Upload {...this.props} />
          <ul>
            User Files
            {files && files.map((file, i)=>{
                return <li key={i}>
                <div className="btn" onClick={()=> this.download(file.filename, file.mimetype)} >{file.filename}</div>
                </li>
              })
            }
          </ul>
          {download &&
            <img src={download} alt="Download File" />
          }
        </div> :
        <div>Loading user info...</div>
      }
      </div>
    );
  }
}

export default SingleUser;
