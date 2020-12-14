import React, { forwardRef, HTMLAttributes } from 'react'

type TextProps = HTMLAttributes<HTMLSpanElement>

const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  return <span ref={ref} {...props} />
})

export default Text
export type { TextProps }
