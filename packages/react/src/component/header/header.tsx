import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { Flex } from '@gm-mobile/c-react'
import classNames from 'classnames'
import _ from 'lodash'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  onBack?: () => void
  title?: string
  hideBack?: boolean
  right?: ReactNode
}

const Header: FC<HeaderProps> = ({
  title,
  hideBack,
  onBack = _.noop,
  right,
  className,
  ...rest
}) => {
  const handleBack = () => {
    onBack()
  }

  return (
    <Flex
      justifyBetween
      {...rest}
      className={classNames('m-header m-text-white m-padding-lr-15', className)}
    >
      <Flex alignCenter>
        {!hideBack && (
          <i
            className='m-font m-font-angle-left m-padding-right-15'
            onClick={handleBack}
          />
        )}
        <div
          className={classNames('m-text-18 m-padding-right-10', {
            'padding-left-8': hideBack,
          })}
        >
          {title}
        </div>
      </Flex>
      {right}
    </Flex>
  )
}

export default Header
export type { HeaderProps }
