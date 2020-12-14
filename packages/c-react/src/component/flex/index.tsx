import React, { forwardRef } from 'react'
import classNames from 'classnames'
import View from '../view'
import { FlexProps } from './types'

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
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
    },
    ref
  ) => {
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
      s.WebkitFlex = typeof flex === 'boolean' ? 1 : flex
    }
    if (height) {
      s.height = height
    }
    if (width) {
      s.width = width
    }

    return <View ref={ref} {...rest} className={cn} style={s} />
  }
)

export default Flex
export { FlexProps }
