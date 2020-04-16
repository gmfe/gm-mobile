import React from 'react'
import Popup from './index'

export const normal = () => {
  return (
    <div>
      <button
        onClick={() => {
          Popup.render({
            left: true,
            children: <div>lala</div>,
          })
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          Popup.render({
            right: true,
            children: <div>lala</div>,
          })
        }}
      >
        right
      </button>
      <button
        onClick={() => {
          Popup.render({
            bottom: true,
            children: <div>lala</div>,
          })
        }}
      >
        bottom
      </button>
    </div>
  )
}

export default {
  title: '浮层/Popup',
}
