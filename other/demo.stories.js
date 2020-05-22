import React from 'react'
import { is } from '@gm-common/tool'

export const Demo = () => {
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
