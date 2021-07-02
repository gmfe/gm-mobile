import { getLocale } from '@gm-mobile/locales'
import React, { useState, FC, ChangeEvent } from 'react'
import _ from 'lodash'
import { Flex } from '../flex'
import { Mask } from '../mask'
import { LayoutRoot } from '../layout_root'
import { View } from '../view'
import Input from './input'
import {
  ErrorInputProps,
  DialogBaseProps,
  DialogStaticsTypes,
  RenderOptions,
} from './types'

const ErrorInput: FC<ErrorInputProps> = ({
  getError,
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
        {...rest}
        className='m-dialog-input'
        value={value}
        onChange={handleChange}
      />
      <View className='m-text-red m-text-12'>
        {(getError && getError(value)) || ''}
      </View>
    </>
  )
}

const DialogStatics: DialogStaticsTypes<string | RenderOptions> = {
  render(options, type) {
    if (typeof options === 'string') {
      options = {
        children: options as string,
      }
    }
    options = { ...(options as RenderOptions) }

    let inputValue = ''

    if (type === 'prompt') {
      options.children = (
        <View className='m-text-left'>
          <View>{options.promptText}</View>
          <ErrorInput
            {...options.promptInputProps}
            className='m-padding-tb-10'
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
      const renderOptions = options as RenderOptions
      const _onConfirm = renderOptions.onConfirm || _.noop
      renderOptions.onConfirm = () => {
        let result: boolean | void

        // 如果是 prompt，需要把 input 传过去
        if (type === 'prompt') {
          result = _onConfirm(inputValue)
        } else {
          result = _onConfirm()
        }
        // 如果是 prompt，且 result 是 false，则阻止默认行为
        if (
          type === 'prompt' &&
          typeof result === 'boolean' &&
          result === false
        ) {
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
        renderOptions.confirmText = (
          <View className='m-text-danger'>{getLocale('删除')}</View>
        )
      }

      // confirm prompt delete 和 onCancel 都会涉及 reject
      if (
        renderOptions.onCancel ||
        type === 'confirm' ||
        type === 'prompt' ||
        type === 'delete'
      ) {
        const _onCancel = renderOptions.onCancel || _.noop
        renderOptions.onCancel = () => {
          DialogStatics.hide()

          const reason = _onCancel()
          setTimeout(() => {
            reject(reason)
          }, 50)
        }
      }

      if (renderOptions.onOther && renderOptions.otherText) {
        const _onOther = renderOptions.onOther
        renderOptions.onOther = () => {
          DialogStatics.hide()
          _onOther()
        }
      }

      LayoutRoot.renderWith(
        LayoutRoot.Type.MODAL,
        <DialogBase {...(options as DialogBaseProps)} />
      )
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
    LayoutRoot.hideWith(LayoutRoot.Type.MODAL)
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
  hideBottom,
  children,
}) => {
  return (
    <View className='m-dialog-container'>
      <Mask
        onClick={() => {
          /**
           * 如果设置了隐藏底部，这时候没有可以关闭弹窗的地方
           * 则点击阴影部分会关闭弹窗
           */
          hideBottom && DialogStatics.hide()
        }}
      />
      <View className='m-dialog m-animated-in m-animated-fade-in'>
        <View className='m-dialog-title'>{title}</View>
        <View className='m-dialog-content'>{children}</View>
        {!hideBottom && (
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
              onClick={() => onConfirm && onConfirm()}
            >
              {confirmText}
            </Flex>
          </Flex>
        )}
      </View>
    </View>
  )
}

export const Dialog = Object.assign(DialogBase, DialogStatics)

export default Dialog
