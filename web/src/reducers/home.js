function home(state = {}, action){
  console.log('home reducer::action', action);
  let newstate = Object.assign({}, state);
  switch(action.type){
    case 'UPLOAD_ATTEMPT':
      return newstate;

    case 'UPLOAD_SUCCESS':
      return newstate;

    case 'UPLAOD_FAIL':
      return newstate;

    case 'SET_FORM':
      newstate.form = action.form;
      return newstate;

    default:
      return state;
  }
}

export default home;
