import React from 'react'

const View = React.forwardRef((props, ref) => {
  return <div ref={ref} {...props} />
})

export default View
