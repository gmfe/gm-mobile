import { getLocale } from '@gm-mobile/locales'
import React, { FC } from 'react'
import classNames from 'classnames'
import { View } from '../view'
import { Text } from '../text'
import { LayoutRoot } from '../layout_root'
import { Loading } from '../loading'
import { Mask } from '../mask'
import { Flex } from '../flex'
import { ToastProps, ToastStaticsTypes } from './types'

let timer: any = null
const ToastStatics: ToastStaticsTypes = {
  clear() {
    clearTimeout(timer)
    LayoutRoot.removeComponent(LayoutRoot.Type.TOAST)
  },
  _tip(options = {}, type) {
    clearTimeout(timer)

    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }

    options = { ...options, type }

    if (options.time === undefined) {
      options.time = 2000
      if (options.type === 'loading') {
        options.time = 20000
      }
    }

    if (options.time) {
      timer = setTimeout(() => {
        ToastStatics.clear()
      }, options.time)
    }
    LayoutRoot.setComponent(LayoutRoot.Type.TOAST, <Toast {...options} />)
  },
  tip(options) {
    ToastStatics._tip(options)
  },
  success(options) {
    ToastStatics._tip(options, 'success')
  },
  warning(options) {
    ToastStatics._tip(options, 'warning')
  },
  loading(options) {
    ToastStatics._tip(options, 'loading')
  },
}

const ToastBase: FC<ToastProps> = ({ children, type }) => {
  let icon = null
  if (type === 'loading') {
    icon = <Loading _isToast />
    children = children || getLocale('加载中...')
  } else if (type === 'success') {
    icon = <Text className='m-font m-font-success-circle' />
  } else if (type === 'warning') {
    icon = <Text className='m-font m-font-warning' />
  }

  // loading 起个遮罩，不让点其他地方
  return (
    <View>
      {type === 'loading' && <Mask opacity={0.01} />}
      <Flex
        justifyCenter
        className={classNames('m-toast', {
          [`m-toast-${type}`]: type,
        })}
      >
        <View className='m-toast-inner'>
          {icon && <View className='m-toast-icon'>{icon}</View>}
          <View className='m-toast-content'>{children}</View>
        </View>
      </Flex>
    </View>
  )
}

export const Toast = Object.assign(ToastBase, ToastStatics)

export default Toast
