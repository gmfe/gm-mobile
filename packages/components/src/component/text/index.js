import React from 'react'

const Text = React.forwardRef((props, ref) => {
  return <span ref={ref} {...props} />
})

export default Text
