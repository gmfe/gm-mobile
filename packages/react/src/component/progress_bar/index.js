import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ProgressBar = ({
  showText,
  className,
  percentage,
  text,
  textInside,
  strokeWidth,
  ...rest
}) => {
  const percent = percentage > 100 ? 100 : percentage

  return (
    <div {...rest} className={classNames('m-progress', className)}>
      <div className='m-progress-bar'>
        <div
          className='m-progress-bar-outer'
          style={{ height: `${strokeWidth}px` }}
        >
          <div
            className='m-progress-bar-inner'
            style={{ width: `${percent}%` }}
          >
            {showText && textInside && <div>{text || `${percent}%`}</div>}
          </div>
        </div>
      </div>

      {showText && !textInside && (
        <div className='m-progress-bar-text'>{text || `${percent}%`}</div>
      )}
    </div>
  )
}

ProgressBar.propTypes = {
  /** 文字是否在进度条里面 */
  textInside: PropTypes.bool,
  /** 是否显示文字 */
  showText: PropTypes.bool,
  className: PropTypes.string,
  /** 进度条高度 */
  strokeWidth: PropTypes.number,
  /** 百分比 */
  percentage: PropTypes.number.isRequired,
  /** 显示的文字 */
  text: PropTypes.string,
}

ProgressBar.defaultProps = {
  textInside: false,
  strokeWidth: 6,
}

export default ProgressBar
