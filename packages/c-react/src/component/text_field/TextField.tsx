import React, { Component, createRef, MouseEvent, RefObject } from 'react'
import classNames from 'classnames'
import _, { clamp, uniqueId } from 'lodash'
import { Flex } from '../flex'
import { TextFieldProps } from './types'
import { View } from '../view'
import { Input } from '../input'
import { Textarea } from '../textarea'

/** 是否小程序端 */
// @ts-ignore
const mp = !!window.wx
/** 是否ios */
const ios = mp && wx.getSystemInfoSync().platform === 'ios'

interface TextFieldState {
  active: boolean
}

export class TextField extends Component<TextFieldProps, TextFieldState> {
  state = {
    active: false,
  }

  id = uniqueId('textField-')
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement> = createRef()

  onClick(e: MouseEvent<HTMLInputElement> | any) {
    if (!mp) e.persist()
    const target = mp ? e.mpEvent.currentTarget : e.target
    // 小程序端的判断逻辑
    if (
      !mp &&
      target.tagName !== 'INPUT' &&
      !this.state.active &&
      this.inputRef.current
    ) {
      this.inputRef.current.focus()
    }
    // 非小程序端的判断逻辑
    if (
      mp &&
      target.id === this.id &&
      !this.state.active &&
      this.inputRef.current
    ) {
      this.inputRef.current.focus()
    }
    if (!this.props.disabled) {
      this.setState((state) => {
        return { ...state, active: true }
      })
    }
    this.props.onClick && this.props.onClick(e)
  }

  onInput(e: any) {
    if (this.props.disabled) return
    if (!mp) e.persist()
    let value = mp ? e.detail.value : e.target.value
    const { min, max } = this.props
    if (
      value &&
      !value.endsWith('.') &&
      ['digit', 'number'].includes(this.props.type || '')
    ) {
      const float = parseFloat(value)
      value = clamp(
        float,
        min === undefined ? -float : min,
        max === undefined ? float : max
      ).toString()
    }
    let updated
    if (mp) {
      Object.assign(e.detail, { value })
      updated = {
        detail: e.detail,
      }
    } else {
      Object.assign(e.target, { value })
      updated = {
        target: e.target,
      }
    }
    this.props.onChange &&
      this.props.onChange({
        ...e,
        ...updated,
      })
  }

  render() {
    const {
      innerClassName,
      errClassName,
      className,
      style,
      onChange = _.noop,
      left,
      prefix,
      suffix,
      right,
      show = true,
      outlined = false,
      bottomLined,
      mini = false,
      large = false,
      normal = true,
      round = false,
      multiLines = false,
      lines = 3,
      err,
      keepErrPlace = false,
      disabled,
      highlight,
      cursorSpacing = 30,
      maxLength,
      confirmType,
      adjustPosition,
      block,
      focus,
      password,
      width,
      onBlur,
      onClick,
      onConfirm,
      ...rest
    } = this.props
    const { active } = this.state
    if (!show) return null
    let height
    if (multiLines) {
      height = 'auto'
    } else if (large) {
      height = '54px'
    } else if (mini) {
      height = '34px'
    } else if (normal) {
      height = '44px'
    } else {
      height = '44px'
    }
    const common = {
      disabled: disabled,
      onInput: this.onInput.bind(this),
      onChange: this.onInput.bind(this),
      onBlur: () => {
        onBlur && onBlur()
        this.setState((state) => {
          return { ...state, active: false }
        })
      },
      onClick: this.onClick.bind(this),
      ...rest,
    }
    if (mp) {
      Object.assign(common, {
        cursorSpacing: cursorSpacing,
        maxlength: maxLength,
        adjustPosition,
        confirmType,
        focus,
        password,
        placeholderClass: 'text-field-placeholder',
        onConfirm,
      })
    } else {
      Object.assign(common, { maxLength: maxLength })
    }
    return (
      <Flex
        flex
        column
        justifyCenter
        id={this.id}
        className={classNames('text-field', className, {
          'text-field-error': !!err,
          ios,
          active: highlight || active,
          highlight,
          disabled,
        })}
        width={width}
        style={style}
        onClick={this.onClick.bind(this)}
      >
        <Flex
          alignCenter={!multiLines}
          flex
          className={classNames({
            'm-relative m-padding-bottom-20': keepErrPlace || !!err,
          })}
        >
          {prefix && (
            <Flex none className='m-margin-right-5 text-field-prefix'>
              {prefix}
            </Flex>
          )}
          <Flex
            className={classNames(
              'text-field-inner',
              {
                'm-border': outlined,
                'border-bottom': bottomLined,
                'border-radius': round,
                'padding-10': !mini,
                'padding-5': mini,
              },
              innerClassName
            )}
            flex
            style={{ minHeight: height }}
          >
            <Flex alignCenter={!multiLines} auto>
              {left && (
                <Flex none className='m-margin-right-5 text-field-left'>
                  {left}
                </Flex>
              )}
              <Flex auto>
                <Flex auto>
                  {multiLines && (
                    <Textarea
                      childRef={this.inputRef as RefObject<HTMLTextAreaElement>}
                      className='textfield-textarea'
                      style={{
                        width: '100%',
                        height: lines * 20 + 'px',
                      }}
                      {...common}
                    />
                  )}
                  {!multiLines && (
                    <Input
                      className='textfield-input'
                      {...common}
                      ref={this.inputRef as RefObject<HTMLInputElement>}
                    />
                  )}
                </Flex>
              </Flex>
              {right && (
                <Flex none className='m-margin-left-5'>
                  {right}
                </Flex>
              )}
            </Flex>
          </Flex>
          {suffix && (
            <Flex none className='m-margin-left-5'>
              {suffix}
            </Flex>
          )}
          <View
            className={classNames('text-field-error-message', errClassName)}
          >
            {err}
          </View>
        </Flex>
      </Flex>
    )
  }
}

export default TextField
