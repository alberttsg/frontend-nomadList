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
      headers: { Authorization: token},
    }
    fmData.append("image", file);
    try {
      const res = await axios.post('https://backend-nomadsociety-development.up.railway.app/users/avatar/', fmData, config);
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
