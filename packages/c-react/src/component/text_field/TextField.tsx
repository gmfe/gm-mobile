import React, { Component, createRef, MouseEvent, RefObject } from 'react'
import classNames from 'classnames'
import _, { clamp, uniqueId } from 'lodash'
import { Flex } from '../flex'
import { TextFieldProps } from './types'
import { View } from '../view'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { IReactionDisposer, observable, reaction, runInAction } from 'mobx'

/** 是否小程序端 */
// @ts-ignore
const mp = !!window.wx
/** 是否ios */
const ios = mp && wx.getSystemInfoSync().platform === 'ios'

interface TextFieldState {
  /** 是否输入状态 */
  active: boolean
}

const store = observable({ active: '' })

export class TextField extends Component<TextFieldProps, TextFieldState> {
  constructor(props: TextFieldProps) {
    super(props)
    this.dispose = reaction(
      () => store.active,
      (active) => {
        // 切换TextField更新active，因为小程序上快速在TextField间切换会有选中状态问题
        if (active === this.id) {
          this.setState((state) => ({ ...state, active: true }))
          // 小程序上同一个input已focus的，再次focus会触发onBlur
          if (this.target === 'WRAPPER') this.focus()
          if (!mp) this.focus()
        } else {
          this.setState((state) => ({ ...state, active: false }))
        }
      },
      {}
    )
  }

  state = {
    active: false,
  }

  id = uniqueId('textField-')

  dispose: IReactionDisposer

  componentWillUnmount() {
    this.dispose()
  }

  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement> = createRef()

  /** 仅服务于小程序端 */
  target?: 'INPUT' | 'WRAPPER'

  lastValue = ''

  focus() {
    if (this.inputRef.current) this.inputRef.current.focus()
  }

  onClick(e: MouseEvent<HTMLInputElement> | any) {
    if (!mp) e.persist()

    const target = mp ? e.mpEvent.currentTarget : e.target
    if (!mp) {
      // 跳过
    } else if (target.id === this.id) {
      this.target = 'WRAPPER'
    } else {
      this.target = 'INPUT'
    }

    if (!this.props.disabled) {
      runInAction(() => {
        store.active = this.id
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
      const float = parseFloat(value.replace(/\D\./g, ''))
      if (isNaN(float)) {
        value = ''
      } else {
        value = clamp(
          float,
          min === undefined ? -float : min,
          max === undefined ? float : max
        )
        if (this.props.fractionDigits && value.toString().indexOf('.') !== -1) {
          const [int, fraction] = value.toString().split('.')
          value = `${int}.${fraction.slice(0, this.props.fractionDigits)}`
        } else {
          value = value.toString()
        }
      }
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
    if (value === this.lastValue) {
      this.forceUpdate()
    }
    this.lastValue = value
  }

  render() {
    const {
      innerClassName,
      errClassName,
      className,
      style,
      onChange,
      left,
      prefix,
      suffix,
      right,
      show = true,
      outlined = false,
      bottomLined,
      mini = false,
      large = false,
      normal = false,
      round = false,
      multiLines = false,
      lines = 3,
      err,
      keepErrPlace = false,
      disabled,
      highlight,
      cursorSpacing = 30,
      maxLength = -1,
      confirmType,
      adjustPosition,
      block,
      focus,
      password,
      width,
      onBlur,
      onClick,
      onConfirm,
      fractionDigits,
      alwaysEmbed = true,
      ...rest
      // 注意，不用传给input或area的props要在此列出来，不然rest会带过去
    } = this.props

    const { active } = this.state
    if (!show) return null

    const common = {
      disabled: disabled,
      onInput: this.onInput.bind(this),
      // onChange: this.onInput.bind(this),
      onClick: this.onClick.bind(this),
      onBlur: () => {
        onBlur && onBlur()
        // 失去焦点更新active
        this.setState((state) => {
          return { ...state, active: false }
        })
        setTimeout(() => {
          if (store.active === this.id) {
            runInAction(() => {
              store.active = ''
            })
          }
        }, 20)
      },
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
        alwaysEmbed: alwaysEmbed,
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
                mini,
                normal: normal || (!mini && !normal && !large),
                large,
                'multi-line': multiLines,
              },
              innerClassName
            )}
            flex
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
            className={classNames('text-field-error-message', errClassName, {
              'has-error': err,
            })}
          >
            {err}
          </View>
        </Flex>
      </Flex>
    )
  }
}

export default TextField
