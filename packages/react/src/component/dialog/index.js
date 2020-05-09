import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import LayerRoot from '../layer_root'
import _ from 'lodash'
import Mask from '../mask'
import Flex from '../flex'
import Input from '../input/input'

const DialogStatics = {
  render(options, type) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options = { ...options }

    if (type === 'prompt') {
      options._id = Math.random()
      options.children = (
        <div className='m-text-left'>
          <div>{options.promptText}</div>
          <div className='m-border-1px-bottom-after'>
            <Input {...options.promptInputProps} autoFocus id={options._id} />
          </div>
        </div>
      )
    }

    return new Promise((resolve, reject) => {
      const _onConfirm = options.onConfirm || _.noop
      options.onConfirm = () => {
        let result
        let inputValue

        // 如果是 prompt，需要把 input 传过去
        if (type === 'prompt') {
          inputValue = document.getElementById(options._id).value
          result = _onConfirm(inputValue)
        } else {
          result = _onConfirm()
        }
        // 如果是 prompt，且 result 是 false，则阻止默认行为
        if (type === 'prompt' && result === false) {
          return
        }

        Promise.resolve(result).then(() => {
          DialogStatics.hide()

          setTimeout(() => {
            resolve(type === 'prompt' ? inputValue : undefined)
          }, 50)
        })
      }

      if (type === 'delete') {
        options.confirmText = (
          <div className='m-text-danger'>{getLocale('删除')}</div>
        )
      }

      // confirm 和 onCancel 都会涉及 reject
      if (options.onCancel || type === 'confirm' || type === 'delete') {
        const _onCancel = options.onCancel || _.noop
        options.onCancel = () => {
          DialogStatics.hide()

          const reason = _onCancel()
          setTimeout(() => {
            reject(reason)
          }, 50)
        }
      }

      if (options.onOther && options.otherText) {
        const _onOther = options.onOther
        options.onOther = () => {
          DialogStatics.hide()
          _onOther()
        }
      }

      LayerRoot.renderWith(LayerRoot.TYPE.MODAL, <Dialog {...options} />)
    })
  },
  alert(options) {
    return DialogStatics.render(options)
  },
  confirm(options) {
    return DialogStatics.render(options, 'confirm')
  },
  delete(options) {
    return DialogStatics.render(options, 'delete')
  },
  prompt(options) {
    return DialogStatics.render(options, 'prompt')
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
          {otherText && (
            <Flex flex column className='m-dialog-btn-other' onClick={onOther}>
              {otherText}
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
  /** prompt 的时候有用 */
  promptText: PropTypes.string,
  /** prompt 的时候有用 */
  promptInputProps: PropTypes.object,
}

Dialog.defaultProps = {
  title: getLocale('提示'),
  confirmText: getLocale('确定'),
  cancelText: getLocale('取消'),
}

export default Dialog
