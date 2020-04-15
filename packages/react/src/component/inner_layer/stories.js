import React from 'react'

import InnerLayer from './'
import Button from '../button'

export const Normal = () => {
  const handleCancel = () => {
    InnerLayer.hide()
  }

  const handleClick = () => {
    InnerLayer.render({
      children: (
        <div className='m-bg-back m-text-center m-padding-20'>
          lalala
          <Button mini className='m-margin-left-20' onClick={handleCancel}>
            取消
          </Button>
        </div>
      ),
    })
  }
  return <div className='m-padding-20' onClick={handleClick}>click here</div>
}

export default {
  title: 'InnerLayer',
}
