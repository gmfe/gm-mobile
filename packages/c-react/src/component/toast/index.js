import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { View } from '../view'
import { Text } from '../text'
import LayoutRoot from '../layout_root'
import { Loading } from '../loading'
import { Mask } from '../mask'
import { Flex } from '../flex'

let timer = null
const ToastStatics = {
  clear() {
    clearTimeout(timer)
    LayoutRoot.removeComponent(LayoutRoot.TYPE.TOAST)
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

    LayoutRoot.setComponent(LayoutRoot.TYPE.TOAST, <Toast {...options} />)
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

const Toast = ({ children, type }) => {
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

Object.assign(Toast, ToastStatics)

Toast.propTypes = {
  time: PropTypes.any, // 在组件上没意义，单纯给静态方法调用参考
  type: PropTypes.oneOf(['success', 'warning', 'loading']),
}

Toast.defaultProps = {
  time: 2000,
}

export default Toast
