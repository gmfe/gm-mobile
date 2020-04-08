import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import LayerRoot from '../layer_root'
import _ from 'lodash'
import Mask from '../mask'
import Flex from '../flex'

const DialogStatics = {
  dialog(options, type) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options = { ...options }

    return new Promise((resolve, reject) => {
      const _onConfirm = options.onConfirm || _.noop
      options.onConfirm = () => {
        Promise.resolve(_onConfirm()).then((data) => {
          DialogStatics.hide()

          setTimeout(() => {
            resolve(data)
          }, 50)
        })
      }

      if (options.onCancel || type === 'confirm') {
        const _onCancel = options.onCancel || _.noop
        options.onCancel = () => {
          DialogStatics.hide()

          const reason = _onCancel()
          setTimeout(() => {
            reject(reason)
          }, 50)
        }
      }

      LayerRoot.renderWith(LayerRoot.TYPE.MODAL, <Dialog {...options} />)
    })
  },
  alert(options) {
    return DialogStatics.dialog(options)
  },
  confirm(options) {
    return DialogStatics.dialog(options, 'confirm')
  },
  hide() {
    LayerRoot.hideWith(LayerRoot.TYPE.MODAL)
  },
}

const Dialog = ({
  title,
  confirmText,
  onConfirm,
  cancelText,
  onCancel,
  otherText,
  onOther,
  children,
}) => {
  return (
    <div className='m-dialog-container'>
      <Mask />
      <div className='m-dialog m-animated-in m-animated-fade-in'>
        <div className='m-dialog-title'>{title}</div>
        <div className='m-dialog-content'>{children}</div>
        <Flex className='m-dialog-btn'>
          {otherText && (
            <Flex flex column className='m-dialog-btn-other' onClick={onOther}>
              {otherText}
            </Flex>
          )}
          {onCancel && (
            <Flex
              flex
              column
              className='m-dialog-btn-cancel'
              onClick={onCancel}
            >
              {cancelText}
            </Flex>
          )}
          <Flex
            flex
            column
            className='m-dialog-btn-confirm'
            onClick={onConfirm}
          >
            {confirmText}
          </Flex>
        </Flex>
      </div>
    </div>
  )
}

Object.assign(Dialog, DialogStatics)

Dialog.propTypes = {
  title: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  otherText: PropTypes.string, // 当有三个按钮时
  onOther: PropTypes.func,
}

Dialog.defaultProps = {
  title: getLocale('提示'),
  confirmText: getLocale('确定'),
  cancelText: getLocale('取消'),
}

export default Dialog
