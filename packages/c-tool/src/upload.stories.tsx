import { noop } from 'lodash'
import React, { FC, useEffect } from 'react'
import router from './router_mp'

export const Normal = () => {
  return <div>小程序上传图片示例</div>
}

Normal.parameters = {
  docs: {
    source: {
      code: `
import { upload } from '@gm-mobile/c-tool'
import {
  GetQiniuUploadToken,
  GetQiniuUploadTokenResponse,
} from 'gm_api/src/cloudapi'

wx.chooseImage({
  count: 1,
})
  .then(async (res) => {
    const tempPath = res.tempFilePaths[0]
    wx.showLoading({ title: '正在上传' })
    const { dir, token } = await GetQiniuUploadToken({
      file_type: type || 0,
    }).then((json: { response: GetQiniuUploadTokenResponse }) => {
      const { dir_path, upload_token } = json.response
      return {
        dir: dir_path,
        token: upload_token,
      }
    })
    return await uploadFile({
      tempPath,
      type: FileType.FILE_TYPE_MERCHANDISE_SSU_IMAGE,
      progress: console.log,
    })
  })
  .then((file) => {
    product.set('thumbPath', file.path)
    wx.hideLoading()
  })
  .catch((err) => {
    if (err.errMsg?.indexOf('cancel') !== -1) return
    console.error(err)
    wx.hideLoading()
    Toast.warning({ children: '上传失败' })
  })
  `,
      type: 'code',
    },
  },
}

export default {
  title: '工具/Upload_MP',
}
