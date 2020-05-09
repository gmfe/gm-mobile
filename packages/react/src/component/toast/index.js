import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LayoutRoot from '../layout_root'
import Loading from '../loading'
import Mask from '../mask'
import Flex from '../flex'
import SVGSuccess from '../../../svg/success.svg'
import SVGInfoCircle from '../../../svg/info-circle.svg'
import SVGWarning from '../../../svg/warning.svg'
import SVGClose from '../../../svg/close.svg'

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
  info(options) {
    ToastStatics._tip(options, 'info')
  },
  warning(options) {
    ToastStatics._tip(options, 'warning')
  },
  danger(options) {
    ToastStatics._tip(options, 'danger')
  },
  loading(options) {
    ToastStatics._tip(options, 'loading')
  },
}

const Toast = ({ children, type }) => {
  let icon = null
  if (type === 'loading') {
    icon = <Loading />
    children = children || getLocale('加载中...')
  } else if (type === 'success') {
    icon = <SVGSuccess />
  } else if (type === 'info') {
    icon = <SVGInfoCircle />
  } else if (type === 'warning') {
    icon = <SVGWarning />
  } else if (type === 'danger') {
    icon = <SVGClose />
  }

  // loading 起个遮罩，不让点其他地方
  return (
    <div>
      {type === 'loading' && <Mask opacity={0.01} />}
      <Flex
        justifyCenter
        className={classNames('m-toast', {
          [`m-toast-${type}`]: type,
        })}
      >
        <div className='m-toast-inner'>
          {icon && <div className='m-toast-icon'>{icon}</div>}
          <div className='m-toast-content'>{children}</div>
        </div>
      </Flex>
    </div>
  )
}

Object.assign(Toast, ToastStatics)

Toast.propTypes = {
  time: PropTypes.any, // 在组件上没意义，单纯给静态方法调用参考
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'loading']),
}

Toast.defaultProps = {
  time: 2000,
}

export default Toast
