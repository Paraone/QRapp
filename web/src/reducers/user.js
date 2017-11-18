function user(state = {}, action){
  let newstate = Object.assign({}, state);
  console.log('user reducer::action', action);
  switch(action.type){

    // UPLOADS /////////////////////////////////////////////
    case 'UPLOAD_ATTEMPT':
      return newstate;

    case 'UPLOAD_SUCCESS':
      newstate.files = [...newstate.files,
                        ...action.res];
      return newstate;

    case 'UPLOAD_FAIL':
      return newstate;

    // DOWNLOADS///////////////////////////////////////
    case 'DOWNLOAD_ATTEMPT':
      return newstate;

    case 'DOWNLOAD_SUCCESS':
      newstate.download = action.result;
      return newstate;

    case 'DOWNLOAD_FAIL':
      return newstate;

    // CREATE USER //////////////////////////////////////
    case 'CREATE_USER_ATTEMPT':
      return newstate;

    case 'CREATE_USER_SUCCESS':
      newstate = action.user;
      return newstate;

    case 'CREATE_USER_FAIL':
      return newstate;

    // LOGIN /////////////////////////////
    case 'LOGIN_ATTEMPT':
      return newstate;

    case 'LOGIN_SUCCESS':
      newstate = action.payload;
      return newstate;

    case 'LOGIN_FAIL':
      return newstate;

    // LOGOUT //////////////////////////////
    case 'LOGOUT_ATTEMPT':
      return newstate;

    case 'LOGOUT_SUCCESS':
      newstate = {};
      return newstate;

    case 'LOGOUT_FAIL':
      return newstate;

    // VALIDATE ////////////////////////////////
    case 'VALIDATE_ATTEMPT':
      return newstate;

    case 'VALIDATE_SUCCESS':
      newstate = action.res;
      newstate.files = action.files;
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
