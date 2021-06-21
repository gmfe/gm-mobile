import React from 'react'
import NProgress from './'

export const normal = () => (
  <div>
    <button
      onClick={() => {
        NProgress.start()
      }}
    >
      start
    </button>
    <button
      onClick={() => {
        NProgress.done()
      }}
    >
      end
    </button>
  </div>
)

export default {
  title: '浮层/NProgress',
  component: NProgress,
}
