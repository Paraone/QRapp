import axios from 'axios';
import {browserHistory} from 'react-router';

const apiCall = axios.create({
  baseURL: 'http://localhost:3030'
})

var delete_cookie = (name)=>{
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};


// UPLOAD FUNCTIONS /////////////////////////////////////////////////////
function attemptUpload(){
  return {
    type: 'UPLOAD_ATTEMPT'
  }
}

function uploadSuccess(res){
  return {
    type: 'UPLOAD_SUCCESS'
  }
}

function uploadFail(err){
  return {
    type: 'UPLOAD_FAIL'
  }
}

export function uploadFile(file){

  let data = new FormData();
  data.append('img', file.files[0]);
  data.append('name', file.name);

  return (dispatch) => {
    dispatch(attemptUpload());
    return apiCall.post('/upload', data).then((res)=>{
      dispatch(uploadSuccess(res));
    }).catch((err)=>{
      dispatch(uploadFail(err));
    })
  }
}

// HOME FUNCTIONS //////////////////////////////////////////////////

export function setForm(form){
  return{
    type: 'SET_FORM',
    form
  };
}

// USER FUNCTIONS /////////////////////////////////////////////////
// create user accounts ///////////////////////////////////////////
function attemptCreateUser(){
  return {
    type: 'CREATE_USER_ATTEMPT'
  };
}

function createUserSuccess(user){
  console.log('user', user);
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
      console.log('res.data: ', res.data);
      if(res.data.err)
        dispatch(loginFail(res.data.err));
      else dispatch(loginSuccess(res.data));
    }).catch((err)=>{
      dispatch(loginFail(err));
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
