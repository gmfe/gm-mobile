import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import LayerRoot from '../layer_root'
import _ from 'lodash'
import Mask from '../mask'

const DialogStatics = {
  dialog(options) {
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

      const _onCancel = options.onCancel || _.noop
      options.onCancel = () => {
        DialogStatics.hide()

        const reason = _onCancel()
        setTimeout(() => {
          reject(reason)
        }, 50)
      }

      LayerRoot.renderWith(LayerRoot.TYPE.MODAL, <Dialog {...options} />)
    })
  },

  alert(options) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options.alert = true
    return DialogStatics.dialog(options)
  },

  confirm(options) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options.confirm = true
    return DialogStatics.dialog(options)
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
        <div className='m-dialog-title'>
          <strong>{title}</strong>
        </div>
        <div className='m-dialog-content'>{children}</div>
        <div className='m-dialog-btn'>
          {otherText && (
            <a className='m-dialog-btn-other' onClick={onOther}>
              {otherText}
            </a>
          )}
          {onCancel && (
            <a className='m-dialog-btn-other-cancel' onClick={onCancel}>
              {cancelText}
            </a>
          )}
          <a className='m-dialog-btn-other-confirm' onClick={onConfirm}>
            {confirmText}
          </a>
        </div>
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
  confirmText: getLocale('确定'),
  cancelText: getLocale('取消'),
}

export default Dialog
