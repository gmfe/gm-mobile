import React, { FC, HTMLAttributes } from 'react'
// import { Flex, Popup, View } from '@gm-mobile/mp'
import _ from 'lodash'
import classNames from 'classnames'
import DKBtn from './Btn'
import './base.less'
import './font/iconfont.css'
import { View } from '../view'
import { Popup } from '../popup'
import { Flex } from '../flex'

/** 数字按钮 */
export const defaultDigitalKeys = [
  ...['7', '8', '9'].map((v, _) => new DKBtn({ label: v })),
  ...['4', '5', '6'].map((v, _) => new DKBtn({ label: v })),
  ...['1', '2', '3'].map((v, _) => new DKBtn({ label: v })),
  new DKBtn({ label: '0' }),
  new DKBtn({
    label: '.',
    fn: (value = '') => {
      if (value === '') {
        return '0.'
      }
      if (value.split('').filter((c) => c === '.').length > 0) {
        return value
      } else {
        return value + '.'
      }
    },
  }),
  new DKBtn({ label: '清零', className: 'btn-clear', fn: (_) => '' }),
]

/** 右侧功能按钮  */
export const defaultActionKeys = [
  new DKBtn({ label: '取消', fn: (_) => '' }),
  new DKBtn({ label: '完成', className: 'm-bg-primary' }),
  new DKBtn({
    label: '大按钮',
    flex: 2,
    className: 'm-bg-primary',
    fn(value) {
      Popup.hide()
      return value
    },
  }),
]

export interface KeyboardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onInput'> {
  /** 输入框当前值 */
  value: string
  /** 虚拟键盘的点击事件 */
  onInput?: (value: string | undefined, key: DKBtn) => void
  /** 虚拟键盘的功能键(actionKeys)点击事件 */
  onAction?: (key: DKBtn) => void
  /** 自定义功能键盘 */
  actionKeys?: typeof defaultActionKeys
  /** 自定义数字键盘 */
  digitalKeys?: typeof defaultDigitalKeys
  /** 是否显示 */
  show?: boolean
  /** 整数类型键盘 */
  int?: boolean
  isClearBtn?: boolean
}

export const Keyboard: FC<KeyboardProps> = ({
  value,
  onInput,
  onAction,
  actionKeys = defaultActionKeys,
  digitalKeys = defaultDigitalKeys,
  show = true,
  className,
  isClearBtn = true,
  int,
  ...rest
}) => {
  const handleInput = (btn: DKBtn) => {
    if (!btn.fn) {
      onInput && onInput(undefined, btn)
      return
    }
    if (actionKeys.find((item) => item.label === btn.label)) {
      onAction && onAction(btn)
    }
    const newVal = btn.fn(value)
    onInput && onInput(newVal, btn)
  }

  // 禁止小数
  const pointBtn = digitalKeys.find((btn) => btn.label === '.')
  if (pointBtn) {
    if (!pointBtn.className) pointBtn.className = ''
    pointBtn.className = pointBtn.className.replace(/ disabled/g, '')
    if (int) {
      pointBtn.className += ' disabled'
    }
  }

  return (
    <View
      className={classNames(className, 'keyboard m-padding-5', { show })}
      {...rest}
    >
      <Flex>
        <Flex flex={3} wrap>
          {digitalKeys
            .filter((f) => (isClearBtn ? f : f.label !== '清零'))
            .map((btn, i) => {
              return (
                <Flex
                  key={i}
                  width={
                    !isClearBtn && btn.label === '0'
                      ? '66.666666%'
                      : '33.33333%'
                  }
                  alignCenter
                  justifyCenter
                  className='keyboard-item'
                >
                  <View
                    className={classNames(
                      'keyboard-button digital m-text-22',
                      btn.className
                    )}
                    onClick={() => handleInput(btn)}
                  >
                    {btn.label}
                  </View>
                </Flex>
              )
            })}
        </Flex>
        <Flex flex={1} column>
          {actionKeys.map((btn, keyIndex) => {
            return (
              <Flex
                key={keyIndex}
                alignCenter
                justifyCenter
                className='keyboard-item'
                flex={btn.flex}
                none
              >
                <View
                  className={classNames(
                    'keyboard-button fn m-text-16',
                    btn.className
                  )}
                  onClick={() => handleInput(btn)}
                >
                  {btn.label ? (
                    btn.label
                  ) : (
                    <Flex alignCenter justifyCenter className='bt-delete'>
                      <View className='triangle' />
                      <Flex
                        alignCenter
                        justifyCenter
                        className='m-text-14 m-text-white square'
                      >
                        x
                      </Flex>
                    </Flex>
                  )}
                </View>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </View>
  )
}

export default Keyboard
