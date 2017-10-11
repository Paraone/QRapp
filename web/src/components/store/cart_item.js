import React, {Component} from 'react';
import numeral from 'numeral';

import './cart_item.css';

class CartItem extends Component{

  constructor(props){
    super(props);

    this.setQty = this.setQty.bind(this);
    this.delete = this.delete.bind(this);
  }

  setQty(n, itemName) {
    this.props.setQty(n, itemName);
  }

  delete(itemName){
    this.props.deleteFromCart(itemName);
  }

  render(){

    const {imgSrc, qty, price, itemName} = this.props.item;

    return(
      <li className="cartItem">
        <div className="">
          <div className="img"><img src={imgSrc} alt="Item"/></div>
          <span onClick={() => this.setQty(-1, itemName)} className="btn">-</span>
          <span className="qty">{qty}</span>
          <span onClick={() => this.setQty(1, itemName)} className="btn">+</span>
        </div>
        <div className="">
          <div onClick={() => this.delete(itemName)} className="del btn">Delete</div>
          <div className="">
            @ <span className="price">${price}</span> each = {numeral(qty*price).format('0.00')}
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;
