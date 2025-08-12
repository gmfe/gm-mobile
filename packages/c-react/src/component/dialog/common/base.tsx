import React, { ReactNode } from 'react'
import { Flex, Popup, View, Button } from '../../..'
import { noop } from 'lodash'
import './base.less'

interface Option<T> {
  title: ReactNode
  okText?: ReactNode
  /** 标题栏左边 */
  left?: ReactNode
  /** right 会替换掉默认的cancel按钮 */
  right?: ReactNode
  cancelText?: ReactNode
  children: ReactNode
  /** 将取代保存(onOk)按钮 */
  bottom?: ReactNode
  zIndex?: number
  /** 入场方向 */
  direction?: 'left' | 'right' | 'bottom' | 'top'
  /** 点击确定按钮后的事件，返回值将作为showDialog的返回值 */
  onOk?: () => T | false
  onCancel?: () => void
}

export function showDialog<T>({
  title,
  zIndex,
  okText = '确定',
  cancelText = '取消',
  left,
  right,
  children,
  bottom,
  direction = 'bottom',
  onOk,
  onCancel,
}: Option<T>) {
  let _resolve: (value: T) => void
  let _reject: (err: any) => void
  const cancel = () => {
    Popup.hide()
    onCancel && onCancel()
    _reject('cancel')
  }
  const ok = (_onOk?: () => T | false) => {
    const ok = (_onOk || onOk || noop)() as any
    if (ok !== false) {
      Popup.hide()
      _resolve(ok)
    } else {
      console.warn('并不ok')
    }
  }
  const promise = new Promise<T>((resolve, reject) => {
    _resolve = resolve
    _reject = reject
    const Template = () => {
      return (
        <Flex column className='m-border-radius m-overflow-hidden m-bg-white'>
          <Flex
            justifyBetween
            alignCenter
            className='m-customer-dialog-header m-padding-10'
          >
            <Flex flex>{left}</Flex>
            <Flex
              flex
              justifyCenter
              className='m-text-bold m-text-16 c-text-black-7'
            >
              {title}
            </Flex>
            <Flex flex justifyEnd>
              {right || (
                <Button
                  mini
                  plain
                  type='link'
                  className='m-text-desc m-margin-lr-0'
                  onClick={cancel}
                >
                  {cancelText}
                </Button>
              )}
            </Flex>
          </Flex>
          {children}
          {bottom || (
            <Flex className='m-padding-lr-10'>
              <Button block type='primary' onClick={() => ok()}>
                {okText}
              </Button>
            </Flex>
          )}
        </Flex>
      )
    }

    Popup.render({
      zIndex,
      disabledHeader: true,
      [direction]: true,
      disabledAnimate: false,
      onHide: cancel,
      children: <Template />,
    })
  })
  Object.assign(promise, { ok, cancel })
  return promise as Promise<T> & {
    /** resolve这个promise */
    ok: (cb?: () => T | false) => void
    /** reject这个promise */
    cancel: () => void
  }
}
