import React, { FC, memo } from 'react'
import classNames from 'classnames'
import { Flex } from '../flex'
import { View } from '../view'
import { Button } from '../button'
import emptyImg from './empty.png'
import _ from 'lodash'
import { getLocale } from '@gm-mobile/locales'
import { StatusProps } from './types'

const Status: FC<StatusProps> = memo(
  ({ type, tip, onReload = _.noop, className, children, ...rest }) => {
    let content = null
    if (type === 'loading') {
      content = (
        <View className='m-text-center'>{tip || getLocale('正在加载...')}</View>
      )
    } else if (type === 'error') {
      content = (
        <View className='m-text-center'>
          <View>{getLocale('加载失败！')}</View>
          <View>
            <Button
              mini
              type='primary'
              onClick={() => {
                onReload()
              }}
            >
              {getLocale('重新加载')}
            </Button>
          </View>
        </View>
      )
    } else if (type === 'empty') {
      content = (
        <View
          style={{
            width: '100px',
            height: '120px',
            backgroundImage: `url(${emptyImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
      )
    }
    return (
      <Flex
        column
        alignCenter
        {...rest}
        className={classNames('m-status', className)}
      >
        {content}
        {children}
      </Flex>
    )
  }
)

export default Status
