import React from 'react'
import FlipNumber from './'

export const normal = () => {
  return <FlipNumber from={0} to={9999.99} delay={1000} />
}

export default {
  title: '基础/FlipNumber',
}
