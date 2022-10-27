import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import { Flex } from '../flex'
import { Mask } from '../mask'
import { LayoutRoot, LayoutRootV1 } from '../layout_root'
import { Button } from '../button'
import { View } from '../view'
import { Text } from '../text'
import { PopupV1Props, PopupStaticsV1Types } from './types'
import { CustomTabbar } from '../custom_tabbar'
import { addUuidToOption } from '../../utils'

const PopupStatics: PopupStaticsV1Types = {
  render(options) {
    const id = addUuidToOption(options)
    LayoutRootV1.renderWith(LayoutRoot.Type.POPUP, <PopupV1 {...options} />)
    return this.hide.bind(this, id)
  },
  hide(id: string) {
    if (!id) {
      console.error('need id when manual hide')
    }
    LayoutRootV1.hideWith(LayoutRoot.Type.POPUP, id)
  },
}

const PopupBase: FC<PopupV1Props> = ({
  title = '',
  left,
  right,
  bottom,
  center,
  width,
  height,
  opacity,
  className,
  style,
  id,
  onHide = _.noop,
  isPickPopup = true,
  disabledHeader,
  disabledMask,
  /** 动画有卡顿现象，先禁用 */
  disabledAnimate = true,
  children,
  closeText,
  headerClassName,
  titleClassName,
  titleCenter,
  clickMaskClose = true,
  disableBottomSafeArea,
  direction = 'bottom',
  ...rest
}) => {
  const isLeft = left || direction === 'left'
  const isRight = right || direction === 'right'
  const isBottom = bottom || direction === 'bottom'
  const isCenter = center || direction === 'center'
  const cn = classNames(
    'm-popup',
    {
      'm-popup-left m-animated-slide-in-left': isLeft,
      'm-popup-right m-animated-slide-in-right': isRight,
      'm-popup-bottom m-animated-slide-in-bottom': isBottom,
      'm-popup-center': isCenter,
      'm-popup-box-shadow': opacity === 0 || disabledMask,
      'm-animated': !disabledAnimate,
      'm-bottom-safe-area': !disableBottomSafeArea,
    },
    className
  )

  const s = Object.assign({}, style)
  if ((isLeft || isRight) && width) {
    s.width = width
  } else if (isBottom) {
    s.height = height
  }

  const hidePopup = () => {
    id && PopupV1.hide(id)
  }
  const onTempHide = () => {
    Promise.resolve(onHide()).then(hidePopup)
  }
  return (
    <View
      className={classNames('m-popup-container', {
        'm-popup-picker-container': isPickPopup,
      })}
    >
      {!disabledMask && (
        <Mask
          opacity={opacity}
          onClick={clickMaskClose ? onTempHide : undefined}
        />
      )}
      <View {...rest} className={cn} style={s}>
        {!disabledHeader && (
          <Flex
            justifyBetween
            alignCenter
            className={classNames('m-popup-top m-relative', headerClassName)}
          >
            <Flex
              flex
              className={classNames(
                'm-padding-left-15 m-text-16',
                { 'm-flex-justify-center': titleCenter },
                titleClassName
              )}
            >
              {title}
            </Flex>

            <Button type='link' onClick={onTempHide}>
              <Flex alignCenter>
                {closeText ?? (
                  <Text className='m-font m-font-close-circle m-text-20 m-text-placeholder' />
                )}
              </Flex>
            </Button>
          </Flex>
        )}
        <View className='m-popup-content'>{children}</View>
        {!disableBottomSafeArea && <CustomTabbar />}
      </View>
    </View>
  )
}

const PopupV1 = Object.assign(PopupBase, PopupStatics)

export default PopupV1
