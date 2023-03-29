import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { uploadAvatar } from '../../../../service/userService';

export const UploadAvatar = () => {

  const uploadImage = (e) => {
    const file = e.file;
    console.log(file);
    uploadAvatar(file).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <Upload name='image' multiple={false} maxCount='1' onChange={uploadImage}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
}
