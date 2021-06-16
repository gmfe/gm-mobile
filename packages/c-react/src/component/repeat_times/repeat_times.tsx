import { useRef, useState, FC, cloneElement, ReactElement } from 'react'
import { RepeatTimesProps } from './types'
import { Toast } from '../toast'

export const RepeatTimes: FC<RepeatTimesProps> = ({
  repeat = 5,
  onRepeat,
  children,
}) => {
  const [times, setTimes] = useState(0)
  const timer = useRef<number | undefined>()

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

  return cloneElement(children as ReactElement, {
    onClick: handleClick,
  })
}

export default RepeatTimes
