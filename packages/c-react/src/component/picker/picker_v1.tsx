import React, { FC, useMemo } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import ConfirmCouplingPicker from './confirm_coupling_picker'
import { View } from '../view'
import { PickerTextProps, PickerV1Props } from './types'
import { Flex } from '../flex'
function mapValueToText(
  data: PickerV1Props['data'] = [],
  map: { [k: string]: string } = {}
) {
  data.forEach(({ value, text, children }) => {
    map[value] = text
    if (Array.isArray(children)) {
      mapValueToText(children, map)
    }
  })
}
const PickerText: FC<PickerTextProps> = ({
  placeholder,
  selected = [],
  map,
  textRight,
}) => {
  const textArr: string[] = []
  selected.forEach((selected) => {
    textArr.push(map[selected])
  })
  const textStr = textArr.join('/')
  return (
    <Flex>
      {!!(placeholder || textStr) && (
        <Flex
          className={classNames('m-w-100p', { 'm-text-placeholder': !textStr })}
          justifyEnd={textRight}
        >
          {textStr || placeholder}
        </Flex>
      )}
    </Flex>
  )
}
function PickerV1<T extends string | number = string>({
  placeholder,
  title,
  headers,
  value,
  data = [],
  valueArr = true,
  renderOption,
  onChange,
  textRight,
  ...res
}: PickerV1Props<T>) {
  // Picker需要接受的value必须为数组
  if (!Array.isArray(value)) {
    value = value === undefined ? [] : [value]
  }
  const onClick = () => {
    const values = [...(value as T[])]
    if (!values?.length) {
      let data0 = data[0]
      while (data0) {
        values.push(data0.value)
        data0 = data0.children?.[0]!
      }
    }
    ConfirmCouplingPicker.render({
      datas: data,
      values,
      title,
      headers,
      renderOption,
    }).then((value) => {
      let newValue: T | T[] = ((value as unknown) as T[]).filter(
        (item) => item !== ''
      )
      if (!valueArr) {
        newValue = newValue[0]
      }
      onChange && onChange(newValue)
      return null
    })
  }

  const map = useMemo(() => {
    const map: { [k: string]: string } = {}
    mapValueToText(data, map)
    return map
  }, [data])
  return (
    <View onClick={onClick} {...res}>
      <PickerText
        placeholder={placeholder}
        selected={value}
        map={map}
        textRight={textRight}
      />
    </View>
  )
}
export default PickerV1
