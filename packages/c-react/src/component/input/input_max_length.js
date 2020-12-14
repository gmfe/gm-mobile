import React from 'react'
import PropTypes from 'prop-types'
import Input from './input'
import View from '../view'

const InputMaxLength = React.forwardRef(
  ({ className, maxLength, value, ...rest }, ref) => {
    return (
      <View className='m-input-max-length'>
        <Input ref={ref} {...rest} value={value} />
        {maxLength && (
          <View className='m-input-max-length-length'>
            {value.length}/{maxLength}
          </View>
        )}
      </View>
    )
  }
)

InputMaxLength.propTypes = {
  ...Input.propTypes,
  /** 最大可输入字数 */
  maxLength: PropTypes.number,
}

export default InputMaxLength