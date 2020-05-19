import React from 'react'
import Panel from './index'

export const normal = () => {
  return (
    <div className='m-bg-back m-padding-15'>
      <Panel>panel</Panel>
      <div className='m-gap-5' />
      <Panel title='标题'>panel</Panel>
      <div className='m-gap-5' />
      <Panel title='标题' action='待分拣'>
        panel
      </Panel>
      <div className='m-gap-5' />
      <Panel title='标题' top>
        panel
      </Panel>
      <div className='m-gap-5' />
      <Panel title='标题' bottom>
        panel
      </Panel>
      <div className='m-gap-5' />
      <Panel
        title='标题 onTitle'
        onTitle={() => {
          window.location.href = 'https://www.baidu.com'
        }}
      >
        panel
      </Panel>
      <div className='m-gap-5' />
      <Panel title='业务自己做上border，不拉通'>
        <div className='m-border-1px-top-before m-margin-lr-15 m-padding-tb-10'>
          lalalaal
        </div>
      </Panel>
      <div className='m-gap-5' />
      <Panel title='业务自己做上border，拉通'>
        <div className='m-border-1px-top-before m-padding-lr-15 m-padding-tb-10'>
          lalalaal
        </div>
      </Panel>
    </div>
  )
}

export default {
  title: '布局/Panel',
}
