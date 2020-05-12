import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Lazy from './lazy'
import _ from 'lodash'

const Item = React.memo(({ targetId, minHeight, children, ...rest }) => {
  // minHeight 不会变，提高性能
  const refStyle = useRef({
    minHeight: `${minHeight}px`,
  })
  return (
    <Lazy {...rest} style={refStyle.current} targetId={targetId}>
      {children}
    </Lazy>
  )
})

Item.propTypes = {
  targetId: PropTypes.string.isRequired,
  minHeight: PropTypes.number.isRequired,
}

const LazyList = forwardRef(
  ({ data, renderItem, itemMinHeight, itemKey, className, ...rest }, ref) => {
    const refList = useRef(null)
    const refId = useRef('' + Math.random())

    useImperativeHandle(ref, () => ({
      apiDoScrollToKey: (key) => {
        const d = refList.current.querySelector(`[data-key="${key}"]`)
        if (d) {
          d.scrollIntoView()
        }
      },
    }))

    return (
      <div
        ref={refList}
        {...rest}
        className={classNames('m-overflow-y', className)}
        id={refId.current}
      >
        {_.map(data, (item, index) => {
          const key = itemKey({ item, index })

          return (
            <Item
              key={key}
              targetId={refId.current}
              minHeight={itemMinHeight({ item, index })}
              data-index={index}
              data-key={key}
            >
              {renderItem({ item, index })}
            </Item>
          )
        })}
      </div>
    )
  }
)

LazyList.Item = Item
LazyList.propTypes = {
  data: PropTypes.array.isRequired,
  /** ({item, index}) */
  renderItem: PropTypes.func.isRequired,
  /** ({item, index}) */
  itemMinHeight: PropTypes.func.isRequired,
  /** ({item, index}) */
  itemKey: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.objectOf,
}

LazyList.defaultProps = {
  itemKey: ({ item, index }) => {
    return index
  },
}

export default React.memo(LazyList)
