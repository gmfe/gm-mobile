import { getLocale } from '@gm-mobile/locales'
import React, { FC } from 'react'
import classNames from 'classnames'
import { Flex } from '../flex'
import { Text } from '../text'
import { FakeSearchProps } from './type'

const FakeSearch: FC<FakeSearchProps> = ({
  placeholder = getLocale('搜索'),
  center,
  className,
  style,
  light,
  children,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      column
      justifyCenter
      className={classNames('m-fake-search', className)}
    >
      <Flex
        alignCenter
        justifyCenter={center}
        className={classNames('m-fake-search-inner', {
          'm-bg-white': light,
        })}
      >
        <Text className='m-font m-font-search' />
        &nbsp;
        {placeholder}
        {children}
      </Flex>
    </Flex>
  )
}

export default FakeSearch
