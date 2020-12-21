import React, { useImperativeHandle, useRef, useState, forwardRef } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '../flex'
import { View } from '../view'
import { ScrollIntoView } from '../scroll_into_view'
import { NavProps, NavApi } from './types'

const Nav = forwardRef<NavApi, NavProps>(
  ({ data, selected, onSelect, horizontal, className, ...rest }, ref) => {
    const refId = useRef((Math.random() + '').slice(2))
    const [targetId, setTargetId] = useState('')

    useImperativeHandle(ref, () => ({
      apiDoScrollToValue: (value: any) => {
        setTargetId(`m-nav-item-${refId.current}-${value}`)
      },
    }))

    return (
      <View
        {...rest}
        className={classNames(
          'm-nav',
          {
            'm-nav-horizontal': horizontal,
          },
          className
        )}
      >
        <ScrollIntoView
          horizontal={horizontal}
          className='m-nav-list'
          targetId={targetId}
        >
          <Flex column={!horizontal}>
            {_.map(data, (v) => (
              <Flex
                none
                key={v.value}
                alignCenter
                className={classNames('m-nav-item', {
                  active: selected === v.value,
                })}
                id={`m-nav-item-${refId.current}-${v.value}`}
                onClick={() => {
                  if (selected !== v.value) {
                    onSelect(v.value)
                  }
                }}
              >
                {v.text}
              </Flex>
            ))}
          </Flex>
        </ScrollIntoView>
      </View>
    )
  }
)

export default Nav
