import React from 'react'
import { ProgressBar } from './index'

export const normal = () => {
  return (
    <div>
      <ProgressBar percentage={80} text='80%' showText textInside />
      <ProgressBar percentage={80} text='80%' showText />
    </div>
  )
}

export default {
  title: '基础/ProgressBar',
}
