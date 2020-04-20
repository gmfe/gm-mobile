import React, { useEffect, useRef, useState } from 'react'
import Button from './button'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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
    setSecond(time)
    timer.current = setInterval(() => {
      setSecond((value) => {
        if (value === 1) {
          clearInterval(timer.current)
        }
        return value - 1
      })
    }, 1000)

    onClick(e)
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
  time: PropTypes.number,
}

ButtonTime.defaultProps = {
  time: 60,
}

export default ButtonTime
