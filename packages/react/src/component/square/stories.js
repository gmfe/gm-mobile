import React from 'react'
import Square from './'

export const Normal = () => {
  return (
    <div style={{ width: '50%' }}>
      <Square className='m-bg-white'>
        <img src='' style={{ width: '100%', height: '100%' }} alt='' />
      </Square>
    </div>
  )
}

export default {
  title: '布局/Square',
}
