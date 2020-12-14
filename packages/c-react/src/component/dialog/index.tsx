import { getLocale } from '@gm-mobile/locales'
import React, { useState, FC, ChangeEvent } from 'react'
import _ from 'lodash'
import Flex from '../flex'
import Mask from '../mask'
import LayoutRoot from '../layout_root'
import { View } from '../view'
import Input from './input'
import {
  ErrorInputProps,
  DialogBaseProps,
  DialogStaticsTypes,
  DialogTypes,
} from './types'

const ErrorInput: FC<ErrorInputProps> = ({
  getError = _.noop,
  defaultValue,
  onChange = _.noop,
  className,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue || '')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    setValue(e.target.value)
  }

  return (
    <>
      <Input
        className='m-dialog-input'
        value={value}
        onChange={handleChange}
        {...rest}
      />
      <View className='m-text-red m-text-12'>{getError(value)}</View>
    </>
  )
}

const DialogStatics: DialogStaticsTypes = {
  render(options, type) {
    if (typeof options === 'string') {
      options = {
        children: options,
      }
    }
    options = { ...options }

    let inputValue = ''

    if (type === 'prompt') {
      options.children = (
        <View className='m-text-left'>
          <View>{options.promptText}</View>
          <ErrorInput
            className='m-padding-tb-10'
            {...options.promptInputProps}
            autoFocus
            getError={options.promptGetError}
            onChange={(e) => {
              inputValue = e.target.value
            }}
          />
        </View>
      )
    }

    return new Promise((resolve, reject) => {
      const _onConfirm = options.onConfirm || _.noop
      options.onConfirm = () => {
        let result

        // 如果是 prompt，需要把 input 传过去
        if (type === 'prompt') {
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

          return setTimeout(() => {
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

const DialogBase: FC<DialogBaseProps> = ({
  title = getLocale('提示'),
  confirmText = getLocale('确定'),
  onConfirm,
  cancelText = getLocale('取消'),
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

const Dialog = Object.assign(DialogBase, DialogStatics)

export default Dialog
export type { DialogTypes }
