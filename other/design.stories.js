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
      <div>
        <span className='m-border-radius-circle m-margin-10 m-border'>50%</span>
      </div>
      <div>
        <span className='m-border-radius-chip m-margin-10 m-border'>
          .m-border-radius-chip
        </span>
      </div>
      <div>
        <span className='m-border-radius-5 m-margin-10 m-border'>
          .m-border-radius-5
        </span>
      </div>
    </div>
  )
}

export const Btn = () => {
  return (
    <div className='m-padding-20'>
      <code>【轻按钮】</code>
      <div className='m-margin-bottom-10'>
        <span className='m-button-text'>
          m-button-text 普通文本添加点击效果
        </span>
      </div>
      <div className='m-margin-bottom-10'>
        <span className='m-button-default' style={{ color: '#fafafa' }}>
          m-button-default 带默认背景白字按钮
        </span>
      </div>
      <div className='m-margin-bottom-10'>
        <span className='m-button-icon outlined'>删</span>
      </div>
      <div className='m-margin-bottom-10'>
        <span className='m-button-primary'>
          m-button-primary 带primary背景白字按钮
        </span>
      </div>
      <div className='m-margin-bottom-10'>
        <span className='m-button-white block'>+block</span>
      </div>
      <div className='m-margin-bottom-10'>
        <div className='m-button large'>+large</div>
      </div>
      <div className='m-margin-bottom-10'>
        <span className='m-button-white outlined'>+outlined</span>
      </div>
    </div>
  )
}

export const Opacity = () => {
  return (
    <div>
      <div>
        <div>【透明度】</div>
        <div>
          m-opacity-{'{'}1-10{'}'} 透明度为10%
        </div>
      </div>
      <div className='m-bg-primary m-opacity-1'>10%</div>
      <div className='m-bg-primary m-opacity-5'>...</div>
      <div className='m-bg-primary m-opacity-10'>100%</div>
    </div>
  )
}

export const Shadow = () => {
  return (
    <div>
      <div>阴影效果</div>
      <div>阴影颜色变量： --m-color-box-shadow</div>
      <div className='m-bg-primary m-text-white m-margin-20 m m-shadow-1'>
        .m-shadow-1
      </div>
      <div className='m-bg-primary m-text-white m-margin-20 m m-shadow-2'>
        .m-shadow-2
      </div>
    </div>
  )
}

export const lineHeight = () => {
  return (
    <div>
      <div className='m-text-desc'>
        行高 m-line-height-{'{'}1-30{'}'}
      </div>
      <div>
        <span className='m-line-height-1 m-bg-primary m-border'>
          lineHeight:0.1
        </span>
      </div>
      <span className='m-line-height-30 m-bg-primary m-border'>
        lineHeight:3
      </span>
      <div />
    </div>
  )
}

export const Ellipsis = () => {
  return (
    <div>
      <div>
        【行数】 m-rows-{'{'}1-10{'}'}行，超出省略
      </div>
      <div className='m-rows-1 m-border'>
        限制仅显示1行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示1行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示1行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示1行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
      </div>
      <div className='m-rows-3 m-border'>
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
        限制仅显示3行，超出省略，超出省略，超出省略，，超出省略，，超出省略，
      </div>
    </div>
  )
}

export const TextOpacity = () => {
  return (
    <div>
      <div>文本透明度</div>
      <div>
        生成的透明度：m-text-{'{'}white|black{'}'}-{'{'}0-10{'}'}
      </div>
      <div className='m-text-black-5'>50%</div>
      <div className='m-text-black-1'>10%</div>
    </div>
  )
}

export const BackgroundOpacity = () => {
  return (
    <div>
      <div>文本透明度</div>
      <div>
        生成的透明度：m-bg-{'{'}white|black{'}'}-{'{'}0-10{'}'}
      </div>
      <div className='m-bg-black-5'>50%</div>
      <div className='m-bg-black-1'>10%</div>
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
  title: 'Class',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
}
