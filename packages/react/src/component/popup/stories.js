import React from 'react'
import Popup from './index'

export const normal = () => {
  return (
    <div>
      <button
        onClick={() => {
          Popup.render({
            left: true,
            children: (
              <div>
                <div>adsfas</div>
              </div>
            ),
            onHide: Popup.hide
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
            onHide: Popup.hide
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
            onHide: Popup.hide
          })
        }}
      >
        bottom
      </button>
      <button
        onClick={() => {
          Popup.render({
            style: {
              top: '50%',
              left: '50%',
              marginTop: '-200px',
              marginLeft: '-150px',
              width: '300px',
              height: '400px',
            },
            children: <div>center</div>,
            disabledHeader: true,
            onHide: Popup.hide
          })
        }}
      >
        center
      </button>
    </div>
  )
}

export const title = () => {
  return (
    <button
      onClick={() => {
        Popup.render({
          title: '啦啦啦',
          bottom: true,
          children: <div>lala</div>,
          onHide: Popup.hide
        })
      }}
    >
      bottom
    </button>
  )
}

export default {
  title: '浮层/Popup',
}
