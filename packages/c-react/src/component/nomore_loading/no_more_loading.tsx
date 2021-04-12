import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import Image from './base'
import { View } from '../view'
import { Flex } from '../flex'
import loading_img from './assets/loading.gif'

interface NoMoreLoadingProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  desc?: string
  noMore: boolean
}

const NoMoreLoading: FC<NoMoreLoadingProps> = ({
  desc = '～我也是有底线的～',
  isLoading = false,
  noMore = false,
  style,
  className,
  ...rest
}) => {
  return (
    <View className={classNames(className)} style={{ ...style }} {...rest}>
      {isLoading && (
        <Flex justifyCenter alignCenter row>
          <Image src={loading_img} style={{ width: '30px', height: '30px' }} />
        </Flex>
      )}
      {noMore && (
        <Flex
          justifyCenter
          alignCenter
          row
          className='m-text-desc m-text-12 m-margin-bottom-20'
          height='40px'
        >
          {desc}
        </Flex>
      )}
    </View>
  )
}

export default NoMoreLoading
export type { NoMoreLoadingProps }
