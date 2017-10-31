import axios from 'axios';

const apiCall = axios.create({
  baseURL: 'http://localhost:3030'
})


// upload file /////////////////////////////////////////////////////
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

export function setForm(form){
  return{
    type: 'SET_FORM',
    form
  }
}


// create user accounts ///////////////////////////////////////////
function attemptCreateUser(){
  return {
    type: 'CREATE_USER_ATTEMPT'
  }
}

function createUserSuccess(user){
  console.log('user', user);
  return {
    type: 'CREATE_USER_SUCCESS',
    user
  }
}

function createUserFail(err){
  console.log('err', err);
  return {
    type: 'CREATE_USER_FAIL',
    err
  }
}

export function createUser(user){
  return (dispatch) =>{
    dispatch(attemptCreateUser());
    return apiCall.post('/users', user).then((res)=>{
      dispatch(createUserSuccess(res));
    }).catch((err)=>{
      dispatch(createUserFail(err));
    })
  }
}

// login ////////////////////////////////////////////////////////////
function attemptLogin(){
  return{type: 'LOGIN_ATTEMPT'}
}

function loginSuccess(res){
  const {data:{token}} = res;
  console.log(token);
  return{
    type: 'LOGIN_SUCCESS',
    token
  }
}

function loginFail(err) {
  return {
    type: 'LOGIN_FAIL',
    err
  }
}

export function login(user){
  return (dispatch) =>{
    dispatch(attemptLogin());
    return apiCall.post('/login', user).then((res)=>{
      dispatch(loginSuccess(res));
    }).catch((err)=>{
      dispatch(loginFail(err));
    })
  }
}

// validate /////////////////////////////////////////////////////////
function attemptValidate(){
  return {type: 'VALIDATE_ATTEMPT'}
}

function validateSuccess(res){
  console.log(res);
  return{
    type: 'VALIDATE_SUCCESS',
    res
  }
}

function validateFail(err){
  return {
    type: 'VALIDATE_FAIL',
    err
  }
}

export function validate(payload){
  console.log('action->validate->token:', payload);
  return (dispatch) =>{
    console.log('middleware', payload);
    dispatch(attemptValidate());
    return apiCall.post('/validate', payload).then((res) =>{
      dispatch(validateSuccess(res));
    }).catch((err)=>{
      dispatch(validateFail(err));
    })
  }
}
