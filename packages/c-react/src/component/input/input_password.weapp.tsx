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
      {/* 小程序端切换 type 会触发原生 input 重建并清空已输入内容（微信官方已知 bug），
          故此处只切 password 属性，不切 type。H5 端见 input_password.tsx */}
      <Input {...props} password={!show} />
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
