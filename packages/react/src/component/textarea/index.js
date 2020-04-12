import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

const Textarea = ({ value, maxLength, className, ...rest }) => {
  return (
    <div className='m-textarea-container'>
      <textarea {...rest} className={classNames('m-textarea', className)} />
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
