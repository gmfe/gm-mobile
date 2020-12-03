import React, { useState, FC } from 'react'
import Input from './input'
import classNames from 'classnames'
import { View } from '../view'
import { Text } from '../text'
import { InputPasswordProps } from './type'

const InputPassword: FC<InputPasswordProps> = (props) => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <View className='m-input-password'>
      <Input {...props} type={show ? 'text' : 'password'} />
      <Text className='m-input-password-icon' onClick={handleShow}>
        <Text
          className={classNames('m-font', {
            'm-font-password-close': !show,
            'm-font-password-open': show,
          })}
        />
      </Text>
    </View>
  )
}

export default InputPassword
