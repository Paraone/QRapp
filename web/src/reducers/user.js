function user(state = {}, action){
  let newstate = Object.assign({}, state);
  switch(action.type){

    case 'CREATE_USER_ATTEMPT':
      return newstate;

    case 'CREATE_USER_SUCCESS':
      newstate = action.user;
      return newstate;

    case 'CREATE_USER_FAIL':
      return newstate;

    case 'LOGIN_ATTEMPT':
      return newstate;

    case 'LOGIN_SUCCESS':
      newstate = action.payload;
      return newstate;

    case 'LOGIN_FAIL':
      return newstate;

    case 'VALIDATE_ATTEMPT':
      return newstate;

    case 'VALIDATE_SUCCESS':
      newstate = action.res;
      newstate.token = document.cookie.split(';').filter((c) => c.startsWith('token'))[0].split('=')[1];
      return newstate;

    case 'VALIDATE_FAIL':
      newstate = {};
      return newstate;

    default:
      return state;
  }
}

export default user;
