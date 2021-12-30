import React, { useState } from 'react'
import { Cell, Checkbox, View } from '../../..'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import './choose.less'
import { showDialog } from './base'

interface Item {
  text: string
  value: string | number
}

export interface ChooseProps {
  /** 标题 */
  title?: string
  /** 选择项列表 */
  list: Item[]
  /** 是否显示确认按钮，多选时multiSelect强制为true */
  needConfirm?: boolean
  /** 是否多选 */
  multiSelect?: boolean
  /** 初始选中的 */
  defaultSelected?: Item[]
  /** 搜索功能 */
  // search?: boolean
  maxHeight?: string
  onCancel?: () => void
}

/** 底部弹出的选择界面 */
export default function ({
  title = '选择',
  list = [],
  needConfirm = false,
  multiSelect = false,
  defaultSelected = [],
  maxHeight = '50vh',
  onCancel,
}: ChooseProps) {
  if (multiSelect) needConfirm = true
  const selected = [...defaultSelected] as Item[]
  const Children = observer(() => {
    const [state, setState] = useState(defaultSelected as Item[])
    return (
      <View
        className='m-padding-tb-5'
        style={{
          maxHeight: maxHeight,
          overflow: 'auto',
        }}
      >
        {list.map((item, i) => {
          const include = !!state.find((item) => item.value === list[i].value)

          const right = multiSelect ? (
            <Checkbox checked={include} primary />
          ) : (
            <View className={classNames({ 'choose-circle': include })} />
          )
          return (
            <Cell
              key={i}
              left={
                <View
                  className={classNames({
                    'm-text-primary': include,
                  })}
                >
                  {item.text}
                </View>
              }
              right={right}
              onClick={() => {
                if (include) {
                  selected.splice(
                    state.findIndex((item) => item.value === list[i].value),
                    1
                  )
                } else {
                  selected.push(item)
                }
                if (needConfirm) {
                  setState(multiSelect ? [...selected] : [item])
                } else {
                  promise.ok(() => [item])
                }
              }}
            />
          )
        })}
      </View>
    )
  })
  const promise = showDialog<Item[]>({
    title,
    children: <Children />,
    onOk: () => selected,
    onCancel: onCancel,
    bottom: needConfirm ? undefined : <View />,
  })
  return promise
}
