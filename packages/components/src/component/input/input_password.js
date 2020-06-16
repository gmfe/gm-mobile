import React, { useState } from 'react'
import Input from './input'
import classNames from 'classnames'
import View from '../view'
import Text from '../text'

const InputPassword = (props) => {
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

InputPassword.propTypes = {
  ...Input.propTypes,
}

export default InputPassword
