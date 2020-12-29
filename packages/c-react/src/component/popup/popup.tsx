import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { devWarnForHook } from '@gm-mobile/c-tool'

import { Flex } from '../flex'
import { Mask } from '../mask'
import { LayoutRoot, LayoutRootType } from '../layout_root'
import { Button } from '../button'
import { View } from '../view'
import { Text } from '../text'
import { PopupProps, PopupStaticsTypes } from './types'

const PopupStatics: PopupStaticsTypes = {
  render(options) {
    LayoutRoot.renderWith(LayoutRootType.POPUP, <Popup {...options} />)
  },
  hide() {
    LayoutRoot.hideWith(LayoutRootType.POPUP)
  },
}

const PopupBase: FC<PopupProps> = ({
  title = '',
  left,
  right,
  bottom,
  width,
  height,
  opacity,
  className,
  style,
  onHide = _.noop,
  isPickPopup,
  disabledHeader,
  disabledMask,
  /** 动画有卡顿现象，先禁用 */
  disabledAnimate = true,
  children,
  ...rest
}) => {
  devWarnForHook(() => {
    if (!left && !right && !bottom) {
      console.error('need oneOf left right bottom')
    }
  })

  const cn = classNames(
    'm-popup',
    {
      'm-popup-left': left,
      'm-popup-right': right,
      'm-popup-bottom': bottom,
      'm-popup-box-shadow': opacity === 0 || disabledMask,
      'm-animated': !disabledAnimate,
      'm-animated-slide-in-left': left,
      'm-animated-slide-in-right': right,
      'm-animated-slide-in-bottom': bottom,
    },
    className
  )

  const s = Object.assign({}, style)
  if ((left || right) && width) {
    s.width = width
  } else if (bottom) {
    s.height = height
  }

  return (
    <View
      className={classNames('m-popup-container', {
        'm-popup-picker-container': isPickPopup,
      })}
    >
      {!disabledMask && <Mask opacity={opacity} onClick={onHide} />}
      <View {...rest} className={cn} style={s}>
        {!disabledHeader && (
          <Flex justifyBetween alignCenter className='m-popup-top'>
            <Flex flex column className='m-padding-left-15 m-text-16'>
              {title}
            </Flex>

            <Button type='link' onClick={onHide}>
              <Flex alignCenter>
                <Text className='m-font m-font-close-circle m-text-20 m-text-placeholder' />
              </Flex>
            </Button>
          </Flex>
        )}
        <View className='m-popup-content'>{children}</View>
      </View>
    </View>
  )
}

const Popup = Object.assign(PopupBase, PopupStatics)

export default Popup
