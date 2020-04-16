import React from 'react'
import Panel from './index'

export const normal = () => {
  return (
    <div className='m-bg-back m-padding-10'>
      <Panel>panel</Panel>
      <div className='m-gap-5' />
      <Panel title='标题'>panel</Panel>
      <div className='m-gap-5' />
      <Panel title='标题' top>
        panel
      </Panel>
      <div className='m-gap-5' />
      <Panel title='标题' bottom>
        panel
      </Panel>
      <div className='m-gap-5' />
      <Panel title='标题' link={'https://www.baidu.com'}>
        panel
      </Panel>
    </div>
  )
}

export default {
  title: '布局/Panel',
}
