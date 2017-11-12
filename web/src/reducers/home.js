function home(state = {}, action){
  let newstate = Object.assign({}, state);
  switch(action.type){

    case 'SET_FORM':
      newstate.form = action.form;
      return newstate;

    default:
      return state;
  }
}

export default home;
