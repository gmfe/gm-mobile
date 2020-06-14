import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ProgressBar = ({
  showText,
  className,
  percentage,
  text,
  textInside,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames('m-progress', className)}>
      <div className='m-progress-bar'>
        <div className='m-progress-bar-outer'>
          <div
            className='m-progress-bar-inner'
            style={{ width: `${percentage}%` }}
          >
            {showText && textInside && <div>{text || `${percentage}%`}</div>}
          </div>
        </div>
      </div>

      {showText && !textInside && (
        <div className='m-progress-bar-text'>{text || `${percentage}%`}</div>
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
  /** 百分比 */
  percentage: PropTypes.number.isRequired,
  /** 显示的文字 */
  text: PropTypes.string,
}

ProgressBar.defaultProps = {
  textInside: false,
}

export default ProgressBar
