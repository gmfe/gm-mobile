import React from 'react'

import { LayoutRoot, LayoutRootV1 } from '../../../../packages/c-react/src'

export default  ({children}) => {
  debugger
  return (
    <>
    {children}
    <LayoutRoot />
    <LayoutRootV1 />
    </>
  )
}