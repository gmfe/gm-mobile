import React from 'react'
import { is } from '@gm-common/tool'

export const demo = () => {
  return (
    <div>
      demo{is.phone() ? 'true' : 'false'}
      <div className='lala'>
        <img src='' alt='' />
      </div>
      <div className='lala'></div>
    </div>
  )
}

export default {
  title: '开发/DEMO',
}
