import React from 'react'
import Signature from '.'

export const View = () => {
  return (
    <Signature
      output='blob'
      image='https://image.document.guanmai.cn/product_img/1588907508246-058712363353500274.png'
      onSave={(blob) => {
        console.log(blob)
      }}
    />
  )
}

export const Edit = () => {
  return (
    <Signature
      output='blob'
      isEdit
      onSave={(blob) => {
        console.log(blob)
      }}
    />
  )
}

export default {
  title: '业务/Signature',
}
