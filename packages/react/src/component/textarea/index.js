import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

const Textarea = ({ value, disabled, maxLength, className, ...rest }) => {
  return (
    <div className='m-textarea-container'>
      <textarea
        {...rest}
        value={value}
        className={classNames(
          'm-textarea',
          {
            disabled,
          },
          className
        )}
      />
      {maxLength && (
        <div className='m-textarea-max-length'>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  )
}

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  rows: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

Textarea.defaultProps = {
  onChange: _.noop,
  rows: '3',
}

export default Textarea
