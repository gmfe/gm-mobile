import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Badge = (props) => {
  const {
    children,
    count,
    className,
    corner,
    dot,
    overflowCount,
    showOverflow,
    style,
    ...rest
  } = props

  const badgeCls = classnames('m-badge', className)

  const textCls = classnames({
    'm-badge-dot': dot,
    'm-badge-text': !dot,
    'm-badge-round': !showOverflow && overflowCount < 100,
    'm-badge-corner': corner,
  })

  let displayText = !dot ? count : ''

  if (count > overflowCount) {
    displayText = overflowCount + (showOverflow ? '+' : '')
  }

  return (
    <span {...rest} className={badgeCls} style={{ ...style }}>
      {children}
      <span className={textCls}>{displayText}</span>
    </span>
  )
}

Badge.propTypes = {
  /** 徽章显示的数字 */
  count: PropTypes.number,
  /** 是否仅显示红点 */
  dot: PropTypes.bool,
  /** 是否在子元素右上角显示徽章数 */
  corner: PropTypes.bool,
  /** 徽章显示的最大数值 */
  overflowCount: PropTypes.number,
  /** 是否显示 '+' 表示数值溢出 */
  showOverflow: PropTypes.bool,
  /** className 样式 */
  className: PropTypes.string,
  /** style 样式 */
  style: PropTypes.object,
}

Badge.defaultProps = {
  dot: false,
  corner: false,
  overflowCount: 99,
  showOverflow: false,
}

export default Badge
