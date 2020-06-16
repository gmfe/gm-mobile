import React from 'react'
import PropTypes from 'prop-types'
import Input from './input'

const InputMaxLength = React.forwardRef(
  ({ className, maxLength, value, ...rest }, ref) => {
    return (
      <div className='m-input-max-length'>
        <Input ref={ref} {...rest} value={value} />
        {maxLength && (
          <div className='m-input-max-length-length'>
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    )
  }
)

InputMaxLength.propTypes = {
  ...Input.propTypes,
  /** 最大可输入字数 */
  maxLength: PropTypes.number,
}

export default InputMaxLength
