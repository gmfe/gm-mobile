import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import UtilMP from '../../util'

const SafeHeaderMP = React.memo(({ className, style, children, ...rest }) => {
  const [right, setRight] = useState(100)

  useEffect(() => {
    const rect = UtilMP.getMenuButtonBoundingClientRect()

    UtilMP.getSystemInfo().then((info) => {
      // 不一定能读到胶囊,或者胶囊占据整个宽
      setRight(rect?.left ? info.windowWidth - rect.left : 0)
    })
  }, [])

  return (
    <View
      {...rest}
      style={{ ...style, paddingRight: right }}
      className={classNames('m-safe-header', className)}
    >
      {children}
    </View>
  )
})

SafeHeaderMP.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SafeHeaderMP
