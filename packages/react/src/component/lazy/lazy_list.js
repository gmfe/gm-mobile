import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Lazy from './lazy'
import _ from 'lodash'

const Item = React.memo(({ targetId, minHeight, children, ...rest }) => {
  return (
    <Lazy {...rest} style={{ minHeight: `${minHeight}px` }} targetId={targetId}>
      {children}
    </Lazy>
  )
})

Item.propTypes = {
  targetId: PropTypes.string.isRequired,
  minHeight: PropTypes.number.isRequired,
}

const LazyList = ({ data, ...rest }, ref) => {
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
    <div ref={refList} {...rest} id={refId.current}>
      {_.map(data, (v, i) => {
        return (
          <Item
            key={i}
            targetId={refId.current}
            minHeight={v.minHeight}
            data-index={i}
            data-key={v.key}
          >
            {v.children}
          </Item>
        )
      })}
    </div>
  )
}

LazyList.Item = Item
LazyList.propTypes = {
  /** [{key, children, minHeight}] */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      children: PropTypes.element.isRequired,
      minHeight: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default React.memo(forwardRef(LazyList))
