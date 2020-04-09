import React from 'react'
import { observable } from 'mobx'

import Square from './'
import Page from '../page'

export const Normal = () => {
  return (
    <Page>
      <div style={{ width: '50%' }}>
        <Square className='m-bg-white'>
          <img src='' style={{ width: '100%', height: '100%' }} alt='' />
        </Square>
      </div>
    </Page>
  )
}

export default {
  title: 'Square',
}
