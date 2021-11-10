import React, { FC, useState, MouseEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { Loading } from '../loading'
import BaseButton from './base'
import { is } from '@gm-mobile/c-tool'
import type { ButtonProps } from './types'
import { Flex } from '../flex'

export const Button: FC<ButtonProps> = ({
  type = 'default',
  plain,
  mini,
  block,
  round,
  disabled,
  onClick = _.noop,
  loading,
  children,
  htmlType = 'button',
  className,
  style,
  minWidth,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadFlag: boolean = loading || isLoading

  const handleClick = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>
  ) => {
    if (loadFlag) {
      return
    }

    const result = onClick(e)

    if (!is.promise(result)) {
      return
    }

    setIsLoading(true)

    Promise.resolve(result)
      .then(() => {
        return setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <BaseButton
      {...rest}
      type={htmlType}
      className={classNames(
        `m-btn m-btn-${type}`,
        {
          'm-btn-block': block,
          'm-btn-mini': mini,
          'm-btn-round': round,
          'm-btn-plain': type !== 'link' && plain,
        },
        className
      )}
      style={{
        ...style,
        minWidth,
      }}
      disabled={!!(loadFlag || disabled)}
      onClick={handleClick}
    >
      {loadFlag && <Loading className='m-btn-loading' />}
      <Flex alignCenter>{children}</Flex>
    </BaseButton>
  )
}

export default Button
