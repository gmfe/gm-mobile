import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Input = React.forwardRef(({ form, className, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      {...rest}
      className={classNames(
        'm-input',
        {
          'm-input-form': form,
        },
        className
      )}
    />
  )
})

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  form: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Input
