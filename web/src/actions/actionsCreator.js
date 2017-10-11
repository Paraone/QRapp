export function confirmBuy(cart){
  return{
    type: 'CONFIRM_BUY',
    cart

  }
}

export function emptyCart(){
  return{
    type: 'EMPTY_CART',
    value: true
  }
}

export function deleteFromCart(itemName){
  return{
    type: 'DELETE_FROM_CART',
    itemName
  }
}

export function setQty(n, itemName){
  return{
    type: 'SET_QTY',
    n,
    itemName
  }
}

export function addToCart(item){

  return{
    type: 'ADD_TO_CART',
    item
  }
}
