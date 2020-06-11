import React from 'react'
import Flex from '../flex'
import View from '../view'

const Divider = ({ children }) => {
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
