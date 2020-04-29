import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const BorderInput = React.forwardRef(
  ({ className, maxLength, value, ...rest }, ref) => {
    return (
      <div className='m-border-input-container'>
        <input
          ref={ref}
          {...rest}
          value={value}
          className={classNames(
            'm-border-input-content',
            { 'm-border-input-content-max-length': maxLength },
            className
          )}
        />
        {maxLength && (
          <div className='m-border-input-max-length'>
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    )
  }
)

BorderInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  /** 最大可输入字数 */
  maxLength: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default BorderInput
