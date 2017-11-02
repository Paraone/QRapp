import React, {Component} from 'react';

class Upload extends Component{

  constructor(){
    super();

    this.submit = this.submit.bind(this);
  }

  submit(e){
    e.preventDefault();
    const {file} = this;
    const {id, username} = this.props.user;

    this.props.uploadFile(file, {id, username});
  }

  render(){
    return(
      <form ref={(input) => this.form = input} onSubmit={(e) => this.submit(e)} className="form">
        <input ref={(input) => this.file = input} type="file" name="uploadFile" />
        <input type="submit"/>
      </form>
    );
  }
}

export default Upload;
