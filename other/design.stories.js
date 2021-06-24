import React from 'react'
import _ from 'lodash'
import { Flex } from '../packages/c-react'

export const spacing = () => {
  return (
    <Flex wrap>
      {['padding', 'margin'].map((type) => {
        return [5, 10, 15, 20].map((space) => {
          const className = `m-bg-back m-${type}-${space}`
          return (
            <Flex width='100px' className={className} key={className}>
              m-{type}-{space}
            </Flex>
          )
        })
      })}
    </Flex>
  )
}

export const font = () => {
  const arr = [11, 13, 14, 17, 18, 20]
  return (
    <div>
      大小
      {_.map(arr, (v) => (
        <div className={`m-text-${v}`}>
          m-text-{v} {v === 14 && '默认'}
        </div>
      ))}
    </div>
  )
}

export const border = () => {
  return (
    <div>
      <div className='m-border m-bg-back m-margin-10'>
        <h3>常规border</h3>
        .m-border .m-border-top .m-border-left .m-border-right .m-border-bottom
      </div>
      <div className='m-border m-border-radius m-bg-back m-margin-10'>
        <h3>圆角</h3>
        .m-border-radius .m-border-radius-top-left .m-border-radius-top-right
        .m-border-bottom-left .m-border-bottom-right
      </div>
      <div className='m-border-1px-after m-bg-back m-margin-10'>
        <h3>1px border</h3>
        <div>.m-border-1px-before .m-border-1px-after</div>
        <div>.m-border-1px-top-before .m-border-1px-top-after</div>
        <div>.m-border-1px-left-before .m-border-1px-left-after</div>
        <div>.m-border-1px-right-before .m-border-1px-right-after</div>
        <div>.m-border-1px-bottom-before .m-border-1px-bottom-after</div>
      </div>
      <div>
        <h3>border none</h3>
        .m-border-none
      </div>
    </div>
  )
}

export const More = () => {
  return (
    <div className='m-padding-20'>
      <div>
        更多:
        <a
          href='https://github.com/gmfe/gm-mobile/tree/master/packages/c-react/src/less'
          target='_blank'
          rel='noreferrer'
        >
          https://github.com/gmfe/gm-mobile/tree/master/packages/c-react/src/less
        </a>
      </div>
    </div>
  )
}

export default {
  title: 'Design',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
}
