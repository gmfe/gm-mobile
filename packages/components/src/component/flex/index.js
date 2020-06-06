import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import View from '../view'

const Flex = ({
  flex,

  auto,
  none,
  width,
  height,

  row,
  column,

  wrap,
  nowrap,

  justifyStart,
  justifyEnd,
  justifyCenter,
  justifyBetween,
  justifyAround,

  alignStart,
  alignEnd,
  alignCenter,
  alignBaseline,
  alignStretch,

  alignContentStart,
  alignContentEnd,
  alignContentCenter,
  alignContentBetween,
  alignContentAround,
  alignContentStretch,

  className,
  style,

  ...rest
}) => {
  const cn = classNames(
    {
      'm-flex': true,

      'm-flex-flex': flex,
      'm-flex-auto': auto,
      'm-flex-none': none || width || height,

      'm-flex-row': row,
      'm-flex-column': column,

      'm-flex-wrap': wrap,
      'm-flex-nowrap': nowrap,

      'm-flex-justify-start': justifyStart,
      'm-flex-justify-end': justifyEnd,
      'm-flex-justify-center': justifyCenter,
      'm-flex-justify-between': justifyBetween,
      'm-flex-justify-around': justifyAround,

      'm-flex-align-start': alignStart,
      'm-flex-align-end': alignEnd,
      'm-flex-align-center': alignCenter,
      'm-flex-align-baseline': alignBaseline,
      'm-flex-align-stretch': alignStretch,

      'm-flex-align-content-start': alignContentStart,
      'm-flex-align-content-end': alignContentEnd,
      'm-flex-align-content-center': alignContentCenter,
      'm-flex-align-content-between': alignContentBetween,
      'm-flex-align-content-around': alignContentAround,
      'm-flex-align-content-stretch': alignContentStretch,
    },
    className
  )

  const s = Object.assign({}, style)
  if (flex) {
    s.flex = typeof flex === 'boolean' ? 1 : flex
    s.WebKitFlex = typeof flex === 'boolean' ? 1 : flex
  }
  if (height) {
    s.height = height
  }
  if (width) {
    s.width = width
  }

  return <View {...rest} className={cn} style={s} />
}

Flex.propTypes = {
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  auto: PropTypes.bool,
  none: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  row: PropTypes.bool,
  column: PropTypes.bool,
  wrap: PropTypes.bool,
  nowrap: PropTypes.bool,
  justifyStart: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  justifyAround: PropTypes.bool,
  alignStart: PropTypes.bool,
  alignEnd: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignBaseline: PropTypes.bool,
  alignStretch: PropTypes.bool,
  alignContentStart: PropTypes.bool,
  alignContentEnd: PropTypes.bool,
  alignContentCenter: PropTypes.bool,
  alignContentBetween: PropTypes.bool,
  alignContentAround: PropTypes.bool,
  alignContentStretch: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Flex
