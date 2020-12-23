import React from 'react'
import Uploader from './uploader'
import { observable } from 'mobx'

const store = observable({
  img: '',
  setImg(img: string) {
    this.img = img
  },
})

export const normal = () => {
  const handleUploader = (files: { preview: string }[]) => {
    console.log(typeof files[0].preview)
    store.setImg(files[0].preview)
  }

  return (
    <div>
      <Uploader onUpload={handleUploader} accept='image/*' />

      <br />
      <Uploader onUpload={handleUploader} accept='image/*'>
        <button className='btn'>自定义</button>
      </Uploader>

      <div>
        <img style={{ maxWidth: '100%' }} src={store.img} alt='' />
      </div>
    </div>
  )
}

export default {
  title: '表单/Uploader',
}
