import React, {Component} from 'react';

class Upload extends Component{
  render(){
    return(
      <form className="form">
        <input type="file"/>
        <input type="submit"/>
      </form>
    );
  }
}

export default Upload;
