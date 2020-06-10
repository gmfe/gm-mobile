import { getLocale } from '@gm-mobile/locales'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import Flex from '../flex'
import Mask from '../mask'
import LayoutRoot from '../layout_root'
import View from '../view'
// import BorderInput from '../input/border_input'

// TODO
const BorderInput = () => {
  return <View />
}

const ErrorInput = ({
  getError,
  defaultValue,
  onChange,
  className,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue || '')

  const handleChange = (e) => {
    onChange(e)
    setValue(e.target.value)
  }

  return (
    <>
      <BorderInput
        className='m-text-14'
        value={value}
        onChange={handleChange}
        {...rest}
      />
      <View className='m-text-red m-text-12'>{getError(value)}</View>
    </>
  )
}

ErrorInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  getError: PropTypes.func,
}

ErrorInput.defaultProps = {
  onChange: noop,
  getError: noop,
}

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
        <View className='m-text-left'>
          <View>{options.promptText}</View>
          <ErrorInput
            className='m-padding-tb-10'
            {...options.promptInputProps}
            autoFocus
            id={options._id}
            getError={options.promptGetError}
          />
        </View>
      )
    }

    return new Promise((resolve, reject) => {
      const _onConfirm = options.onConfirm || noop
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
          <View className='m-text-danger'>{getLocale('删除')}</View>
        )
      }

      // confirm prompt delete 和 onCancel 都会涉及 reject
      if (
        options.onCancel ||
        type === 'confirm' ||
        type === 'prompt' ||
        type === 'delete'
      ) {
        const _onCancel = options.onCancel || noop
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

      LayoutRoot.renderWith(LayoutRoot.TYPE.MODAL, <Dialog {...options} />)
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
    LayoutRoot.hideWith(LayoutRoot.TYPE.MODAL)
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
    <View className='m-dialog-container'>
      <Mask />
      <View className='m-dialog m-animated-in m-animated-fade-in'>
        <View className='m-dialog-title'>{title}</View>
        <View className='m-dialog-content'>{children}</View>
        <Flex className='m-dialog-bottom'>
          {onCancel && (
            <Flex
              flex
              column
              className='m-dialog-btn m-dialog-btn-cancel'
              onClick={onCancel}
            >
              {cancelText}
            </Flex>
          )}
          {otherText && (
            <Flex
              flex
              column
              className='m-dialog-btn m-dialog-btn-other'
              onClick={onOther}
            >
              {otherText}
            </Flex>
          )}
          <Flex
            flex
            column
            className='m-dialog-btn m-dialog-btn-confirm'
            onClick={onConfirm}
          >
            {confirmText}
          </Flex>
        </Flex>
      </View>
    </View>
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
  /**  */
  promptGetError: PropTypes.func,
}

Dialog.defaultProps = {
  title: getLocale('提示'),
  confirmText: getLocale('确定'),
  cancelText: getLocale('取消'),
}

export default Dialog
