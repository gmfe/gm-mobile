import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SVGAngleRight from '../../../svg/angle-right.svg'
import Flex from '../flex'

const Panel = ({
  title,
  onTitle,
  action,
  top,
  bottom,
  className,
  children,
}) => {
  return (
    <div
      className={classNames(
        'm-panel',
        {
          'm-panel-top': top,
          'm-panel-bottom': bottom,
        },
        className
      )}
    >
      <Flex alignCenter>
        {title && (
          <Flex
            alignCenter
            flex={!action}
            justifyBetween={!action}
            className='m-panel-title'
            onClick={onTitle}
          >
            {title}
            {onTitle && <SVGAngleRight className='m-margin-left-5' />}
          </Flex>
        )}
        {action && <Flex flex />}
        {action && <div className='m-panel-action'>{action}</div>}
      </Flex>
      <div className='m-panel-content'>{children}</div>
    </div>
  )
}

Panel.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** 提供 onTitle，则 title 有右箭头 */
  onTitle: PropTypes.func,
  action: PropTypes.element,
  /** 贴上边，左上 右上 没有圆角 */
  top: PropTypes.bool,
  /** 贴下边，左下 右下 没有圆角 */
  bottom: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Panel
