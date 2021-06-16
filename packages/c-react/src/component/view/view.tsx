import React, { forwardRef, HTMLAttributes } from 'react'

type ViewProps = HTMLAttributes<HTMLDivElement>

export const View = forwardRef<HTMLDivElement, ViewProps>((props, ref) => {
  return <div ref={ref} {...props} />
})

export default View
export type { ViewProps }
