function home(state = {}, action){
  let newstate = Object.assign({}, state);
  console.log('home reducer "action"', action);
  switch(action.type){
    case 'UPLOAD_ATTEMPT':
      return newstate;

    case 'UPLOAD_SUCCESS':
      return newstate;

    case 'UPLAOD_FAIL':
      return newstate;

    default:
      return state;
  }
}

export default home;
