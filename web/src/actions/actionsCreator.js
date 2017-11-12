import axios from 'axios';
import {browserHistory} from 'react-router';
import base64 from 'base-64';

const apiCall = axios.create({
  baseURL: 'http://localhost:3030'
})

const delete_cookie = (name)=>{
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

// HOME FUNCTIONS //////////////////////////////////////////////////

export function setForm(form){
  return{
    type: 'SET_FORM',
    form
  };
}


// UPLOAD FUNCTIONS /////////////////////////////////////////////////////
function attemptUpload(){
  return {
    type: 'UPLOAD_ATTEMPT'
  }
}

function uploadSuccess(res, showAlert){
  console.log('res', res)
  showAlert(res.message, 'success');
  // setTimeout(()=>{
  //   browserHistory.push('/');
  // });
  return {
    type: 'UPLOAD_SUCCESS',
    res: res.data
  }
}

function uploadFail(err, showAlert){
  showAlert(err, 'error')
  return {
    type: 'UPLOAD_FAIL'
  }
}

export function uploadFile(file, user, showAlert){

  let data = new FormData();
  data.append('username', user.username);
  data.append('name', file.name);
  data.append('user_id', user.id);
  data.append('uploadFile', file.files[0]);

  return (dispatch) => {
    dispatch(attemptUpload());
    return apiCall.post('/upload', data).then((res)=>{
      if(res.data.err) return dispatch(uploadFail(res.data.err, showAlert));

      if(res.data.message) return dispatch(uploadSuccess(res.data, showAlert));
    }).catch((err)=>{
      return dispatch(uploadFail(err, showAlert));
    });
  }
}

// DOWNLOAD FUNCTIONS /////////////////////////////////////////////

function attemptDownload(){
  return {
    type: 'DOWNLOAD_ATTEMPT'
  }
}

function downloadSuccess(result, showAlert){
  return{
    type: 'DOWNLOAD_SUCCESS',
    result
  }
}

function downloadFail(err, showAlert){
  showAlert('File cannot download!', 'error');
  return{
    type: 'DOWNLOAD_FAIL',
    err
  }
}

export function download(filename, mimetype, user, showAlert){

  return (dispatch) =>{
    dispatch(attemptDownload());
    return apiCall.post(`/download/${user.username}/files/${filename}`, {mimetype}, {responseType: 'arraybuffer'}).then((result)=>{
      console.log('result', result)
      const blob = new Blob([result.data], {type: result.headers['content-type']});
      const reader = new FileReader();
      reader.onload = ()=>{
        dispatch(downloadSuccess(reader.result, showAlert));
      };
      reader.readAsDataURL(blob);
    }).catch((err)=>{
      if(err) console.log('err', err);
      dispatch(downloadFail(err, showAlert));
    });
  }

}

// USER FUNCTIONS /////////////////////////////////////////////////
// create user accounts ///////////////////////////////////////////
function attemptCreateUser(){
  return {
    type: 'CREATE_USER_ATTEMPT'
  };
}

function createUserSuccess(user, showAlert){
  showAlert('User created!', 'success')
  setTimeout(()=>{
    browserHistory.push(`/users/${user.id}`);
  });
  const now = new Date();
  var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()+60, now.getUTCMilliseconds());
  if(document.cookie) delete_cookie('token');
  document.cookie = `token=${user.token};expires=${utc_timestamp};`;
  return {
    type: 'CREATE_USER_SUCCESS',
    user
  };
}

function createUserFail(err, showAlert){
  showAlert('User could not be created!', 'error')
  return {
    type: 'CREATE_USER_FAIL',
    err
  };
}

export function createUser(user, showAlert){
  return (dispatch) =>{
    dispatch(attemptCreateUser());
    return apiCall.post('/users', user).then((res)=>{
      dispatch(createUserSuccess(res.data, showAlert));
      dispatch(setForm('login'));
    }).catch((err)=>{
      dispatch(createUserFail(err, showAlert));
    });
  };
}

// login ////////////////////////////////////////////////////////////
function attemptLogin(){
  return{type: 'LOGIN_ATTEMPT'};
}

function loginSuccess(payload, showAlert){
  showAlert('You have logged in successfully!', 'success');
  // browserHistory.push placed at bottom of stack, after state changes
  setTimeout(()=>{
    browserHistory.push(`/users/${payload.id}`);
  });
  const now = new Date();
  var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()+30, now.getUTCMilliseconds());
  if(document.cookie) delete_cookie('token');
  document.cookie = `token=${payload.token};expires=${utc_timestamp};`;
  return{
    type: 'LOGIN_SUCCESS',
    payload
  };
}

function loginFail(err, showAlert) {
  showAlert(err, 'error');
  return {
    type: 'LOGIN_FAIL',
    err
  };
}

export function login(user, showAlert){
  return (dispatch) =>{
    dispatch(attemptLogin());
    return apiCall.post('/login', user).then((res)=>{
      if(res.data.err)
        dispatch(loginFail(res.data.err, showAlert));
      else dispatch(loginSuccess(res.data, showAlert));
    }).catch((err)=>{
      dispatch(loginFail(err, showAlert));
    })
  }
}

// logout /////////////////////////////////////////////////////////
function attemptLogout(){
  return{type: 'LOGOUT_ATTEMPT'};
}

function logoutSuccess(payload, showAlert){
  showAlert('You have logged out successfully!')
  delete_cookie('token');
  setTimeout(()=>{
    browserHistory.push('/');
  });
  return{
    type: 'LOGOUT_SUCCESS',
    payload
  };
}

function logoutFail(err, showAlert) {
  showAlert('You could not be logged out!', 'error');
  return {
    type: 'LOGOUT_FAIL',
    err
  };
}

export function logout(id, showAlert){
  return (dispatch) =>{
    dispatch(attemptLogout());
    return apiCall.post('/logout', {id}).then((res)=>{
      if(res.data.err)
        dispatch(logoutFail(res.data.err, showAlert));
      else dispatch(logoutSuccess(res.data, showAlert));
    }).catch((err)=>{
      dispatch(logoutFail(err, showAlert));
    })
  }
}

// validate /////////////////////////////////////////////////////////
function attemptValidate(){
  return {type: 'VALIDATE_ATTEMPT'};
}

function validateSuccess(res, files){

  return{
    type: 'VALIDATE_SUCCESS',
    res,
    files
  };
}

function validateFail(err, showAlert){
  // showAlert("You're user session could not be verified!",'error');
  delete_cookie('token');
  // browserHistory.push placed at bottom of stack, after state changes
  setTimeout(() =>{
    browserHistory.push('/');
  });
  return {
    type: 'VALIDATE_FAIL',
    err
  };
}

export function validate(payload, showAlert){
  return (dispatch) =>{
    dispatch(attemptValidate());
    return apiCall.post('/validate', payload).then((res) =>{
      if(res.data.err) dispatch(validateFail(res.data.err, showAlert));
      if(res.data.decoded) dispatch(validateSuccess(res.data.decoded, res.data.data));
    }).catch((err)=>{
      dispatch(validateFail(err, showAlert));
    });
  };
}
