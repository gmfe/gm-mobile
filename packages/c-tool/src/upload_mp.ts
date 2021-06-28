import { UUID } from '@gm-mobile/c-tool'
import moment from 'moment'
// import {
//   FileType,
//   GetQiniuUploadToken,
//   GetQiniuUploadTokenResponse,
// } from 'gm_api/src/cloudapi'

const DOMAIN = 'https://qncdn.guanmai.cn/'
const UPLOAD_URL = 'https://upload-z2.qiniup.com'

export interface UploadOptions {
  /** 微信选择的文件路径 */
  tempPath: string
  /** 上传到七牛的服务器目录，gm_api GetQiniuUploadToken接口获取 */
  dir: string
  /** 七牛token，gm_api GetQiniuUploadToken接口获取 */
  token: string
  /** 保存类型, 参考gm_api/src/cloudapi/types.ts->FileType */
  type?: number
  success?: (res: Result) => void
  fail?: (err: any) => void
  complete?: (res: any) => void
  progress?: (
    res: WechatMiniprogram.UploadTaskOnProgressUpdateCallbackResult
  ) => void
  cancelTask?: (abort: () => void) => void
}

interface Result {
  key: string
  url: string
  hash: string
  path: string
}

/** 小程序上传文件到七牛 */
const uploadFile = async (options: UploadOptions): Promise<Result> => {
  const token = options.token
  const type = options.type || 0
  const dir =
    options.dir || `${moment().format('yyyy-MM-dd')}/miniprogram/type_${type}/`
  const name = `${UUID.generate()}.` + options.tempPath.split('.').reverse()[0]
  const key = dir + name
  return new Promise((resolve, reject) => {
    const formData = { token, key }
    const uploadTask = wx.uploadFile({
      url: UPLOAD_URL,
      filePath: options.tempPath,
      name: 'file',
      formData: formData,
      success: function (res) {
        const dataString = res.data
        try {
          const dataObject: Result = JSON.parse(dataString)
          const fileURL = DOMAIN + '/' + dataObject.key
          dataObject.url = fileURL
          dataObject.path = dataObject.key
          options.success && options.success(dataObject)
          resolve(dataObject)
        } catch (e) {
          console.error('parse JSON failed, origin String is: ' + dataString)
          options.fail && options.fail(e)
          reject(e)
        }
      },
      fail: function (error) {
        console.error(error)
        options.fail && options.fail(error)
        reject(error)
      },
      complete: function (err) {
        options.complete && options.complete(err)
        reject(err)
      },
    })

    uploadTask.onProgressUpdate((res) => {
      options.progress && options.progress(res)
    })

    options.cancelTask &&
      options.cancelTask(() => {
        uploadTask.abort()
      })
  })
}

export default uploadFile
