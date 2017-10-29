import axios from 'axios';

export function attemptUpload(){
  return {
    type: 'UPLOAD_ATTEMPT'
  }
}

export function uploadSuccess(){
  return {
    type: 'UPLOAD_SUCCESS'
  }
}

export function uploadFail(){
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
    return axios.post('http://localhost:3030/upload', data).then((res)=>{
      console.log('res', res);
      dispatch(uploadSuccess());
    }).catch((err)=>{
      if(err) console.log(err);
      dispatch(uploadFail());
    })
  }
}
