import React, {Component} from 'react';

export default class Modal extends Component{

  closeModal(){
    this.props.closeModal();

  }

  render(){
    return(
      <div className="Modal">
        <div className="Modal-content">
        <div onClick={this.closeModal}>close</div>
          Modal here...
        </div>
      </div>
    );
  }
}
