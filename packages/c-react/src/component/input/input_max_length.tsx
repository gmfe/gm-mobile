import React, { forwardRef } from 'react'
import Input from './input'
import { View } from '../view'
import { InputMaxLengthProps } from './type'

const InputMaxLength = forwardRef<HTMLInputElement, InputMaxLengthProps>(
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

export default InputMaxLength
