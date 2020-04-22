import React from 'react'
import PreviewImage from './index'
import Flex from '../flex'

const imgs = [
  {
    url:
      'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png',
    name: 'picDesc',
  },
  {
    url: 'http://img.ts.cn/003/509/817/00350981702_dd0fed0a.jpg',
    name: 'picDesc',
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
        })
      }}
    >
      多张图片预览
    </button>
  </div>
)

export default {
  title: '基础/PreviewImage',
}
