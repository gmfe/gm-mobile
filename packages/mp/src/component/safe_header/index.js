import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import UtilMP from '../../util'

const SafeHeaderMP = ({ className, style, children, ...rest }) => {
  const [right, setRight] = useState(100)

  useEffect(() => {
    // eslint-disable-next-line
    const rect = UtilMP.getMenuButtonBoundingClientRect()

    // eslint-disable-next-line
    UtilMP.getSystemInfo().then((info) => {
      // 不一定能读到胶囊
      rect.left && setRight(info.windowWidth - rect.left)
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
}

SafeHeaderMP.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SafeHeaderMP
