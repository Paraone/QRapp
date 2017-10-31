function user(state = {}, action){
  let newstate = Object.assign({}, state);
  switch(action.type){

    case 'CREATE_USER_ATTEMPT':
      return newstate;

    case 'CREATE_USER_SUCCESS':
      return newstate;

    case 'CREATE_USER_FAIL':
      return newstate;

    case 'LOGIN_ATTEMPT':
      return newstate;

    case 'LOGIN_SUCCESS':
      newstate.token = action.token;
      return newstate;

    case 'LOGIN_FAIL':
      return newstate;

    case 'VALIDATE_ATTEMPT':
      return newstate;

    case 'VALIDATE_SUCCESS':
      return newstate;

    case 'VALIDATE_FAIL':
      return newstate;

    default:
      return state;
  }
}

export default user;
