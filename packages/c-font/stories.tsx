import React from 'react'
import { Flex, Text } from '../c-react/src'
import fonts from './fonts/fonts'

export const Icon = () => {
  return (
    <Flex wrap alignBaseline>
      {fonts.map((font, i) => {
        return (
          <Flex
            key={i}
            className='m-padding-lr-10'
            width='33%'
            height='150px'
            column
            alignCenter
            justifyCenter
          >
            <Text className={`m-font-${font.name}`} />
            <Text className='m-margin-top-10'>m-font-{font.name}</Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default {
  title: 'Icon',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
}
