import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SVGAngleRight from '../../../svg/angle-right.svg'
import Flex from '../flex'

const Panel = ({
  title,
  onTitle,
  action,
  onAction,
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
      <Flex>
        {title && (
          <Flex alignCenter className='m-panel-title' onClick={onTitle}>
            {title}
            {onTitle && <SVGAngleRight className='m-margin-left-5' />}
          </Flex>
        )}
        <Flex flex />
        {action && (
          <Flex column className='m-panel-action' onClick={onAction}>
            {action}
          </Flex>
        )}
      </Flex>
      <div className='m-panel-content'>{children}</div>
    </div>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  /** 提供 onTitle，则 title 有右箭头 */
  onTitle: PropTypes.func,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onAction: PropTypes.func,
  /** 贴上边，左上 右上 没有圆角 */
  top: PropTypes.bool,
  /** 贴下边，左下 右下 没有圆角 */
  bottom: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Panel
