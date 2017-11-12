import React, {Component} from 'react';

class SingleFile extends Component{
  render(){
    const {user, params:{filename}} = this.props;

    return(
      <div className="container file">
        {user.username} :: {filename}
      </div>
    );
  }
}

export default SingleFile;
