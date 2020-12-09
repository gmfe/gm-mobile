import React from 'react'

const BaseButton = React.forwardRef((props, ref) => {
  return <button ref={ref} {...props} />
})

export default BaseButton
