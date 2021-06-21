import React, { FC } from 'react'
import { Flex } from '../flex'
import { View } from '../view'

export const Divider: FC = ({ children }) => {
  return (
    <Flex className='m-divider'>
      <Flex flex className='m-divider-line' />
      <View className='m-padding-lr-10'>
        {typeof children === 'string' ? <View>{children}</View> : children}
      </View>
      <Flex flex className='m-divider-line' />
    </Flex>
  )
}

export default Divider
