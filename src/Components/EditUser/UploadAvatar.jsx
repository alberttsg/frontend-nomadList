import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from 'axios';

export const UploadAvatar = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGUyZTY4MjEyOTE3ZWViNDU5ZjFkYyIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2Nzk0MDM0NjQsImV4cCI6MTY3OTQxNDI2NH0.garlrsW8e_SAwKceiv_sqcCexuL0xdgIcbDebbR29NM'},
    }
    fmData.append("image", file);
    try {
      const res = await axios.post('http://localhost:3000/users/avatar/', fmData, config);
      onSuccess("Ok");
      console.log("server res: ", res);
    }catch(err){
      console.log(err)
      const error = new Error("Some error");
      onError({ err });
    }
  }

  return (
    
    <Upload customRequest={uploadImage}>
     <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
}
