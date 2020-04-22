import React from 'react'
import Lazy from './index'
import _ from 'lodash'
import Page from '../page'

export const normal = () => {
  return (
    <Page>
      {_.map(_.range(30), (v) => (
        <Lazy key={v} style={{ height: '100px' }}>
          {v}
        </Lazy>
      ))}
    </Page>
  )
}

export default {
  title: '布局/Lazy',
}
