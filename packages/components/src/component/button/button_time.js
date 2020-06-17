import React, { useEffect, useRef, useState } from 'react'
import Button from './button'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { is } from '@gm-mobile/tool'

const ButtonTime = ({ time, onClick, className, children, ...rest }) => {
  const [second, setSecond] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  const handleClick = (e) => {
    const fn = onClick(e)
    if (fn === false) {
      return
    }
    if (is.promise(fn)) {
      return fn.then(() => {
        startCount()
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

ButtonTime.propTypes = {
  ...Button.propTypes,
  /** 计时的时间 */
  time: PropTypes.number,
  /** 函数需要返回 bool 值, true 开始计时，false 不计时 */
  onClick: PropTypes.func.isRequired,
}

ButtonTime.defaultProps = {
  time: 60,
}

export default ButtonTime
