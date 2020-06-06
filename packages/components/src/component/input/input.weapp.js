import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Input as TInput } from '@tarojs/components'

// 做了 onInput 到 onChange 的改变

const Input = ({ onChange, onInput, form, focus, className, ...rest }) => {
  const handleChange = (e) => {
    onChange && onChange(e)
    onInput && onInput(e)
  }

  return (
    <TInput
      {...rest}
      onInput={handleChange}
      className={classNames(
        'm-input',
        {
          'm-input-form': form,
        },
        className
      )}
    />
  )
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'idcard', 'digit']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
  form: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  password: PropTypes.bool,
  /* 小程序特有 */
  confirmType: PropTypes.oneOf(['send', 'search', 'next', 'go', 'done']),
}

export default Input
