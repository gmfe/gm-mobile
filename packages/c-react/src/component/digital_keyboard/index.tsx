import React, { ReactNode, useEffect, useState } from 'react'
import { makeObservable } from 'mobx'
import { Keyboard, KeyboardProps } from './Base'
import { observer } from 'mobx-react'
import { clamp } from 'lodash'
import { View } from '../view'
import Btn from './Btn'
import { Popup } from '../popup'

/** 是否小程序端 */
// @ts-ignore
const mp = !!window.wx

export type DigitalKeyboardProps = Omit<KeyboardProps, 'value' | 'int'> & {
  /** 增加键盘上方额外内容 */
  header?: ReactNode
  /** form的key，默认活动字段 */
  active?: string
  /** 表单的字段键值对 */
  form: {
    [key: string]: string
  }
  /** 下方用上安全边距 */
  withSafeArea?: boolean
  /** rewrite mode下，切换输入框焦点后(即active改变后)，输入前先清空输入框 */
  rewriteMode?: boolean
  /** 浮点模式下(int:false)，小数位个数限制，默认为2 */
  fractionDigits?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
}

export class DigitalKeyboard {
  constructor({
    header,
    form,
    active,
    onInput,
    onAction,
    withSafeArea,
    rewriteMode = false,
    fractionDigits = 2,
    min,
    max,
    style,
    ...rest
  }: DigitalKeyboardProps) {
    this.form = form
    this.active = active || Object.keys(form)[0]
    const Children = observer(() => {
      const sys = mp && wx.getSystemInfoSync()
      const safeMargin =
        withSafeArea && mp ? sys.screenHeight - sys.safeArea.bottom : 5
      const [state, setState] = useState({
        // 用于配合rewriteMode
        needClear: false,
      })
      useEffect(() => {
        setState((state) => {
          return {
            ...state,
            needClear: rewriteMode,
          }
        })
      }, [this.active])
      return (
        <View>
          <View className='popup-keyboard-header'>{header}</View>
          <Keyboard
            className='popup-keyboard'
            actionKeys={this.actionKeys}
            value={this.form[this.active]}
            onInput={(value, btn) => {
              const oldValue = value
              // rewriteMode
              if (state.needClear) {
                setState((state) => {
                  return {
                    ...state,
                    needClear: false,
                  }
                })

                if (/([0-9])/.test(btn.label || '')) {
                  value = value?.split('')?.reverse()![0] as string
                }
              }

              // 限制小数位数
              if (
                !this.int &&
                value &&
                value?.indexOf('.') !== -1 &&
                value.split('.').reverse()[0].length > fractionDigits
              ) {
                value = value?.slice(0, value.length - 1)
              }

              if (btn.type === 'digit' && value && !value.endsWith('.')) {
                const num = parseFloat(value)
                if (!isNaN(num as number)) {
                  value = clamp(
                    num,
                    min === undefined ? num : min,
                    max === undefined ? num : max
                  ).toString()
                }
              }

              if (value !== undefined) {
                this.set(this.active, value)
              }
              onInput && onInput(value, btn)
            }}
            onAction={onAction}
            int={this.int}
            style={{
              ...style,
              paddingBottom: safeMargin + 'px!important',
            }}
            {...rest}
          />
        </View>
      )
    })
    this.children = <Children />
    makeObservable(this, {
      form: true,
      active: true,
      set: true,
      setActive: true,
      next: true,
      int: true,
      setInt: true,
    })
  }

  active: string
  /** 表单的字段键值对 */
  form: {
    [key: string]: string
  }

  /** 键盘组件 */
  readonly children: ReactNode
  /** 整数型键盘 */
  int = false
  /** 设置为整数型键盘 */
  setInt(int?: boolean) {
    if (int === undefined) int = true
    this.int = int
  }

  /** 自定义功能按钮 */
  get actionKeys() {
    return [
      new Btn({ label: '清零', fn: (_) => '' }),
      new Btn({
        label: '下一个',
        className: 'm-bg-primary m-text-white',
        fn: (value) => {
          this.next()
          return this.form[this.active]
        },
      }),
      new Btn({
        label: '确认',
        flex: 2,
        className: 'm-bg-primary m-text-white',
        fn: (value) => {
          return this.form[this.active]
        },
      }),
    ]
  }

  /** 取form中的指定key值 */
  get(key: string) {
    return this.form[key]
  }

  /** 设置form中的指定key值 */
  set(key: string, value: string) {
    this.form[key] = value
    return this
  }

  /** 设置active为form中的指定key */
  setActive(active: string) {
    this.active = active
  }

  /** 设置active为form中的当前key的下一个key */
  next() {
    const keys = Object.keys(this.form)
    const index = keys.indexOf(this.active)
    if (index >= keys.length - 1) {
      this.active = keys[0]
    } else {
      this.active = keys[index + 1]
    }
    return this
  }

  /** 弹窗弹出键盘 */
  show() {
    Popup.render({
      disabledMask: true,
      disabledHeader: true,
      disabledAnimate: false,
      bottom: true,
      children: this.children,
    })
    mp && wx.hideKeyboard()
  }

  hide() {
    Popup.hide()
  }
}
export default DigitalKeyboard

export { Btn } from './Btn'
