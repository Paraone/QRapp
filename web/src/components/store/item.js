import React, {Component} from 'react';
import numeral from 'numeral';

import './item.css';

class Item extends Component{
  constructor(props){
    super(props);

    this.state = {
      isMouseOver : false
    }

    this.addToCart = this.addToCart.bind(this);
  }

  toggleName(){
    let {isMouseOver} = this.state;
    isMouseOver = !isMouseOver;
    this.setState({isMouseOver});
  }

  addToCart(item){

    this.props.addToCart(item);

  }

  render(){

    let {imgSrc, itemName, price, quantityRemaining} = this.props.item;
    let itemNameTemp;
    itemName = itemName.split(" ").map((w)=> w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    if(itemName.length > 25){
      itemNameTemp = itemName.substr(0, 22) + '...';
    }
    price = numeral(price).format('0.00');

    return(
      <li className="col-md-3 col-sm-4">
        <div onMouseOver={() => this.toggleName()} onMouseOut={() => this.toggleName()} className="item">
          <div className="img"><img src={imgSrc} alt="Item Image"/></div>
          <div className="itemName">{
            !this.state.isMouseOver ? itemNameTemp || itemName : itemName
          }</div>
          <div className="priceLine"><span className="price">{`$${price}`}</span> <span className="quantityRemaining">{quantityRemaining} in stock</span></div>
        {quantityRemaining > 0 ?
          <div className="btn-primary btn" onClick={()=> this.addToCart(this.props.item)}>Add to Cart</div>
        : <div className="btn">Out of Stock</div>
        }
        </div>
      </li>
    );
  }
}

export default Item;
