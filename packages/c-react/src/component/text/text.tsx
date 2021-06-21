import React, { forwardRef, HTMLAttributes } from 'react'

type TextProps = HTMLAttributes<HTMLSpanElement>

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  return <span ref={ref} {...props} />
})

export default Text
export type { TextProps }
