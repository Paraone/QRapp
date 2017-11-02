import axios from 'axios';
import {browserHistory} from 'react-router';

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

function uploadSuccess(res){
  console.log('uploadSuccess', res)
  return {
    type: 'UPLOAD_SUCCESS'
  }
}

function uploadFail(err){
  console.log('uploadFail', err);
  return {
    type: 'UPLOAD_FAIL'
  }
}

export function uploadFile(file, user){

  let data = new FormData();
  data.append('username', user.username);
  data.append('name', file.name);
  data.append('user_id', user.id);
  data.append('uploadFile', file.files[0]);

  return (dispatch) => {
    dispatch(attemptUpload());
    return apiCall.post('/upload', data).then((res)=>{
      console.log('res', res)
      if(res.data.err) dispatch(uploadFail(res.data.err));
      if(res.data.message) dispatch(uploadSuccess(res.data.message));
    }).catch((err)=>{
      dispatch(uploadFail(err));
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

function createUserSuccess(user){
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

function createUserFail(err){
  console.log('err', err);
  return {
    type: 'CREATE_USER_FAIL',
    err
  };
}

export function createUser(user){
  return (dispatch) =>{
    dispatch(attemptCreateUser());
    return apiCall.post('/users', user).then((res)=>{
      dispatch(createUserSuccess(res.data));
      dispatch(setForm('login'));
    }).catch((err)=>{
      dispatch(createUserFail(err));
    });
  };
}

// login ////////////////////////////////////////////////////////////
function attemptLogin(){
  return{type: 'LOGIN_ATTEMPT'};
}

function loginSuccess(payload){
  // browserHistory.push placed at bottom of stack, after state changes
  setTimeout(()=>{
    browserHistory.push(`/users/${payload.id}`);

  });
  const now = new Date();
  var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()+60, now.getUTCMilliseconds());
  if(document.cookie) delete_cookie('token');
  document.cookie = `token=${payload.token};expires=${utc_timestamp};`;
  return{
    type: 'LOGIN_SUCCESS',
    payload
  };
}

function loginFail(err) {
  return {
    type: 'LOGIN_FAIL',
    err
  };
}

export function login(user){
  return (dispatch) =>{
    dispatch(attemptLogin());
    return apiCall.post('/login', user).then((res)=>{
      if(res.data.err)
        dispatch(loginFail(res.data.err));
      else dispatch(loginSuccess(res.data));
    }).catch((err)=>{
      dispatch(loginFail(err));
    })
  }
}

// logout /////////////////////////////////////////////////////////
function attemptLogout(){
  return{type: 'LOGOUT_ATTEMPT'};
}

function logoutSuccess(payload){
  delete_cookie('token');
  setTimeout(()=>{
    browserHistory.push('/');
  });
  return{
    type: 'LOGOUT_SUCCESS',
    payload
  };
}

function logoutFail(err) {
  return {
    type: 'LOGOUT_FAIL',
    err
  };
}

export function logout(id){
  return (dispatch) =>{
    dispatch(attemptLogout());
    return apiCall.post('/logout', {id}).then((res)=>{
      if(res.data.err)
        dispatch(logoutFail(res.data.err));
      else dispatch(logoutSuccess(res.data));
    }).catch((err)=>{
      dispatch(logoutFail(err));
    })
  }
}

// validate /////////////////////////////////////////////////////////
function attemptValidate(){
  return {type: 'VALIDATE_ATTEMPT'};
}

function validateSuccess(res){
  return{
    type: 'VALIDATE_SUCCESS',
    res
  };
}

function validateFail(err){
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

export function validate(payload){
  return (dispatch) =>{
    dispatch(attemptValidate());
    return apiCall.post('/validate', payload).then((res) =>{
      if(res.data.err) dispatch(validateFail(res.data.err));
      if(res.data.decoded) dispatch(validateSuccess(res.data.decoded));
    }).catch((err)=>{
      dispatch(validateFail(err));
    });
  };
}
