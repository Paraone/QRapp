import React, {Component} from 'react';
import axios from 'axios';

import Upload from '../forms/upload';

class Home extends Component{

  constructor(){
    super();

    this.state = {
      response: 'API'
    }

    this.api = this.api.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e){
    e.preventDefault();

    let {form, file} = this;

    let data = new FormData();
    data.append('img', file.files[0]);
    data.append('name', file.name);


    axios.post('http://localhost:3030/upload', data).catch((err)=>{
      console.log(err);
    }).then((res)=>{
      console.log('res', res)
      this.setState({response: res.data.message});
    })
  }

  api(){
    axios.get('http://localhost:3030/').catch((err)=>{
      console.log(err);
    }).then((res) =>{
      console.log(res);
      this.setState({response: res.data.message});
    });
  }

  render(){
    return(
      <div className="container home">
        <form ref={(input) => this.form = input} onSubmit={(e) => this.submit(e)} className="form">
          <input ref={(input) => this.file = input} type="file" name="upfile" id="file"/>
          <input type="submit"/>
        </form>
        <div onClick={() => this.api()} className="btn btn-primary">{this.state.response}</div>
      </div>
    );
  }
}

export default Home;
