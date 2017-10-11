function fruit(state = {}, action){
  let newstate = Object.assign({}, state);
  switch(action.type){

    case 'ADD_TO_CART':
      const {itemName, imgSrc, price, quantityRemaining}= action.item;
      if(newstate.cart[itemName]){
        if(newstate.cart[itemName].qty >= quantityRemaining){
          console.log('item qty cannot exceed quantityRemaining');
          return state;
        }
        newstate.cart[itemName].qty++;
      } else {
        newstate.cart[itemName] = {
          itemName,
          imgSrc,
          price,
          qty: 1
        };
      }
      return newstate;

    case 'SET_QTY':
      let item = newstate.inventory.filter((e) => e.itemName === action.itemName)[0];
      if(newstate.cart[action.itemName].qty + action.n > item.quantityRemaining) {
        console.log('item qty cannot exceed quantityRemaining');
        return newstate;
      }
      if(newstate.cart[action.itemName].qty + action.n < 0){
        console.log('item qty cannot be negative');
        return newstate;
      }
      newstate.cart[action.itemName].qty += action.n;
      return newstate;

    case 'DELETE_FROM_CART':
      let {cart} = newstate;
      cart[action.itemName] = null;
      newstate.cart = {};
      Object.keys(cart).filter(e => !!cart[e]).map((e) =>{
        newstate.cart[e] = cart[e];
      });
      return newstate;

    case 'EMPTY_CART':
      newstate.cart = {};
      return newstate;

    case 'CONFIRM_BUY':
      Object.keys(action.cart).forEach((item) => {
        let curr = newstate.inventory.filter((e) => e.itemName === action.cart[item].itemName)[0];
        curr.quantityRemaining -= action.cart[item].qty;
      });
      newstate.cart = {};
      return newstate;
    default:
      return state;
  }
}

export default fruit;
