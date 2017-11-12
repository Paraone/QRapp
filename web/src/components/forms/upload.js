import React, {Component} from 'react';

class Upload extends Component{

  constructor(){
    super();

    this.submit = this.submit.bind(this);
  }

  submit(e){
    e.preventDefault();
    const {file, form} = this;
    const {id, username} = this.props.user;

    this.props.uploadFile(file, {id, username}, this.props.showAlert);
    form.reset();
  }

  render(){
    return(
      <form className="form row" ref={(input) => this.form = input} onSubmit={(e) => this.submit(e)}>
        <input className="col-md-2" type="submit" value="Upload File"/>
        <input className="col-md-3" ref={(input) => this.file = input} type="file" name="uploadFile" />
      </form>
    );
  }
}

export default Upload;
