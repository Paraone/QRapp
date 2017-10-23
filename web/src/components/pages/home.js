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

    let data = new FormData();
    let {form, file} = this;

    data.append('img', file.value);
    data.append('name', file);


    axios.post('http://localhost:3030/upload', {body: data}, {

    }).catch((err)=>{
      console.log(err);
    }).then((res)=>{
      this.setState({response: res.message});
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
          <input ref={(input) => this.file = input} type="file"/>
          <input type="submit"/>
        </form>
        <div onClick={() => this.api()} className="btn btn-primary">{this.state.response}</div>
      </div>
    );
  }
}

export default Home;
