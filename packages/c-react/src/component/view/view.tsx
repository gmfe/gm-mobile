import React, { forwardRef, HTMLAttributes } from 'react'

type ViewProps = HTMLAttributes<HTMLDivElement>

const View = forwardRef<HTMLDivElement, ViewProps>((props, ref) => {
  return <div ref={ref} {...props} />
})

export default View
export type { ViewProps }
