import React, { FC, useState, MouseEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { Loading } from '../loading'
import BaseButton from './base'
import { is } from '@gm-mobile/c-tool'
import type { ButtonProps } from './types'

export const Button: FC<ButtonProps> = ({
  type = 'default',
  plain,
  mini,
  block,
  noRound,
  disabled,
  onClick = _.noop,
  loading,
  children,
  htmlType = 'button',
  className,
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
          'm-btn-no-round': noRound,
          'm-btn-plain': type !== 'link' && plain,
        },
        className
      )}
      disabled={!!(loadFlag || disabled)}
      onClick={handleClick}
    >
      {loadFlag && <Loading className='m-btn-loading' />}
      {children}
    </BaseButton>
  )
}

export default Button
