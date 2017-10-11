import React, {Component} from 'react';
import numeral from 'numeral';

import CartItem from './cart_item';

class Cart extends Component{

  constructor(props){
    super(props);

    this.confirm = this.confirm.bind(this);
    this.emptyCart = this.emptyCart.bind(this);

  }

  emptyCart(){
    this.props.emptyCart();
  }

  confirm(cart){
    this.props.confirmBuy(cart);
  }

  render(){
    const {cart} = this.props.fruit;
    let cart_items = Object.keys(cart);
    let cart_total = cart_items.map((item) => {
      return cart[item].qty * cart[item].price;
    }).reduce((pre, cur) => {
      return pre + cur;
    }, 0);

    cart_total = numeral(cart_total).format('0.00');

    return(
      <div>
        <h2>Shopping Cart</h2>
        <div>{cart_items.length ? `${cart_items.length} items` : 'Cart is Empty'}</div>
        <ul>
          {Object.keys(cart).length > 0 &&
            cart_items.map((item, i)=>{
              return <CartItem item={cart[item]} key={i} {...this.props} />
            })
          }
        </ul>
      {cart_items.length > 0 &&
        <div className="total">
          <div className="cartTotal">Total: ${cart_total}</div>
          <div onClick={this.emptyCart} className="empty">Empty Cart</div>
          <div onClick={() => this.confirm(cart)} className="confirm btn-primary btn">Confirm Purchase</div>
        </div>
      }
      </div>
    );
  }
}

export default Cart;
