import React from 'react'
import PreviewImage from './index'

const imgs = [
  {
    img:
      'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png',
  },
  {
    img: 'http://img.ts.cn/003/509/817/00350981702_dd0fed0a.jpg',
  },
]

export const normal = () => (
  <div>
    <div style={{ display: 'none' }}>
      <PreviewImage images={imgs} />
    </div>
    <button
      onClick={() => {
        PreviewImage.render({
          images: imgs.slice(0, 1),
        })
      }}
    >
      单张图片预览
    </button>
  </div>
)

export const multiImgs = () => (
  <div>
    <div style={{ display: 'none' }}>
      <PreviewImage images={imgs} />
    </div>
    <button
      onClick={() => {
        PreviewImage.render({
          images: imgs,
          defaultIndex: 1,
        })
      }}
    >
      多张图片预览
    </button>
  </div>
)

export default {
  title: 'Swiper/PreviewImage',
  component: PreviewImage,
}
