import React, { useEffect, useRef, useState, FC, MouseEvent } from 'react'
import Button from './button'
import classNames from 'classnames'
import { is } from '@gm-mobile/c-tool'
import { ButtonTimeProps } from './types'

const ButtonTime: FC<ButtonTimeProps> = ({
  time = 60,
  onClick,
  className,
  children,
  ...rest
}) => {
  const [second, setSecond] = useState(0)
  const timer = useRef<undefined | number>()

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>
  ): void | Promise<void> => {
    const fn = onClick(e)
    if (fn === false) {
      return
    }
    if (is.promise(fn)) {
      return (fn as Promise<void>).then(() => {
        return startCount()
      })
    }

    startCount()
  }

  const startCount = () => {
    setSecond(time)
    timer.current = setInterval(() => {
      setSecond((value) => {
        if (value === 1) {
          clearInterval(timer.current)
        }
        return value - 1
      })
    }, 1000)
  }

  return (
    <Button
      {...rest}
      disabled={!!second}
      onClick={handleClick}
      className={classNames('m-btn-time', className)}
    >
      {children}
      {!!second && `(${second}s)`}
    </Button>
  )
}

export default ButtonTime
