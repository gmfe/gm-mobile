import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Toast } from '@gm-mobile/components'

const RepeatTimes = ({ repeat, onRepeat, children }) => {
  const [times, setTimes] = useState(0)
  const timer = useRef(null)

  const handleClick = () => {
    clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      setTimes(0)
    }, 500)

    setTimes(times + 1)

    if (times >= 2) {
      Toast.tip(`debug ${times + 1}/${repeat}`)
    }

    if (times >= repeat - 1) {
      setTimes(0)
      onRepeat()
    }
  }

  return React.cloneElement(children, {
    onClick: handleClick,
  })
}

RepeatTimes.propTypes = {
  repeat: PropTypes.number,
  onRepeat: PropTypes.func.isRequired,
}

RepeatTimes.defaultProps = {
  repeat: 5,
}

export default RepeatTimes
