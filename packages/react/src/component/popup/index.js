import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
import LayoutRoot from '../layout_root'
import _ from 'lodash'
import { devWarnForHook } from '@gm-common/tool'
import Flex from '../flex'
import Button from '../button'
import SVGCloseCircle from '../../../svg/close-circle.svg'

const PopupStatics = {
  render(options) {
    LayoutRoot.renderWith(LayoutRoot.TYPE.POPUP, <Popup {...options} />)
  },
  hide() {
    LayoutRoot.hideWith(LayoutRoot.TYPE.POPUP)
  },
}

const Popup = ({
  title,
  left,
  right,
  bottom,
  width,
  height,
  opacity,
  className,
  style,
  onHide,
  isPickPopup,
  disabledHeader,
  disabledMask,
  disabledAnimate,
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
    <div
      className={classNames('m-popup-container', {
        'm-popup-picker-container': isPickPopup,
      })}
    >
      {!disabledMask && <Mask opacity={opacity} onClick={onHide} />}
      <Flex column {...rest} className={cn} style={s}>
        {!disabledHeader && (
          <Flex justifyBetween alignCenter className='m-popup-top'>
            <Flex flex column className='m-padding-left-15 m-text-16'>
              {title}
            </Flex>

            <Button type='link' onClick={onHide}>
              <Flex alignCenter>
                <SVGCloseCircle className='m-text-20 m-text-placeholder' />
              </Flex>
            </Button>
          </Flex>
        )}
        <div className='m-popup-content m-flex-flex'>{children}</div>
      </Flex>
    </div>
  )
}

Object.assign(Popup, PopupStatics)

Popup.propTypes = {
  title: PropTypes.string,
  onHide: PropTypes.func,
  left: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  opacity: PropTypes.number,
  disabledHeader: PropTypes.bool,
  disabledMask: PropTypes.bool,
  disabledAnimate: PropTypes.bool,

  // 内部用
  isPickPopup: PropTypes.bool,

  className: PropTypes.string,
  style: PropTypes.object,
}

Popup.defaultProps = {
  // 动画有卡顿现象，先禁用
  disabledAnimate: false,
  onHide: _.noop,
}

export default Popup
