function home(state = {}, action){
  let newstate = Object.assign({}, state);
  switch(action.type){
    case 'ADD_TO_CART':
      return newstate;
    default:
      return state;
  }
}

export default home;
