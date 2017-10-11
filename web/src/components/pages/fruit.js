import React, {Component} from 'react';

import * as numeral from 'numeral';

import Item from '../store/item';
import Cart from '../store/cart';
import './fruit.css';

export default class Fruit extends Component{
  render(){
    const {inventory} = this.props.fruit;
    return(
      <div  className="container fruit">
        <div className="row">
          <div className="store col-md-9">
            <ul className="row">
              {/* map over items in inventory */
                inventory.map((item, i)=>{
                  return <Item item={item} key={i} {...this.props}/>
                })
              }
            </ul>
          </div>
          <div className="cart col-md-3">
              <Cart {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
