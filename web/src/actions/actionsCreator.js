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
