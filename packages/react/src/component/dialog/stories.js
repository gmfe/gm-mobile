import React from 'react'
import Dialog from './'

export const normal = () => {
  return (
    <div>
      <button
        onClick={() => {
          Dialog.alert('啦啦啦啦').then(() => {
            console.log('resolve')
          })
        }}
      >
        alert
      </button>
      <button
        onClick={() => {
          Dialog.confirm('是否要啥啥啥').then(
            () => {
              console.log('resolve')
            },
            () => {
              console.log('reject')
            }
          )
        }}
      >
        confirm
      </button>
    </div>
  )
}

export default {
  title: 'Dialog',
}
