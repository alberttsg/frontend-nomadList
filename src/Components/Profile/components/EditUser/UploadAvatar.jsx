import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { uploadAvatar } from '../../../../service/userService';

export const UploadAvatar = () => {

  const uploadImage = async (options) => {
    const { onSuccess, onError, onProgress, file } = options;
    const fmData = new FormData();
    fmData.append("image", file);
    try {
      await uploadAvatar(fmData);
      onSuccess("Ok");
    } catch (err) {
      const error = new Error(err.message);
      onError({ error });
    }
  }

  return (
    <Upload customRequest={uploadImage}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  )
}
