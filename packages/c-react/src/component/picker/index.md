# 表单/Picker
```tsx
import React from 'react'
import Picker from './component/picker'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import ConfirmPicker from './confirm_picker'
import ConfirmCouplingPicker from './confirm_coupling_picker'
import SelectPicker from './select_picker'
import { default as TempPickerV1 } from './picker_v1'
import { View } from '../view'
import { Button } from '../button'
import { Text } from '../text'

const datas = [
  [
    { value: 'Mr.', text: 'Mr.' },
    { value: 'Mrs.', text: 'Mrs.' },
    { value: 'Ms.', text: 'Ms.' },
    {
      value: 'Dr.',
      text: 'Dr.',
    },
  ],
  [
    { value: 'John', text: 'John' },
    { value: 'Micheal', text: 'Micheal' },
    {
      value: 'Elizabeth',
      text: 'Elizabeth',
    },
  ],
  [
    { value: 'Lennon', text: 'Lennon' },
    { value: 'Jackson', text: 'Jackson' },
    {
      value: 'Jordan',
      text: 'Jordan',
    },
    { value: 'Legend', text: 'Legend' },
    { value: 'Taylor', text: 'Taylor' },
  ],
]

const couplingData = [
  {
    value: 'T11660',
    text: '喵喵分仓一',
    children: [
      {
        value: 'S8058',
        text: '综合商品-喵喵分仓一',
        children: [
          {
            value: '00000',
            text: '000000',
          },
        ],
      },
    ],
  },
  {
    value: 'T7936',
    text: '喵喵总仓',
    children: [
      {
        value: 'S8056',
        text: '综合商品',
        children: [
          {
            value: '11111',
            text: '111111',
          },
        ],
      },
      {
        value: 'S11186',
        text: '复制报价单',
        children: [
          {
            value: '2222222',
            text: '222222',
          },
          {
            value: '777777',
            text: '777777',
          },
        ],
      },
      {
        value: 'S11226',
        text: '复制报价单D',
        children: [
          {
            value: '333333',
            text: '33333333',
          },
        ],
      },
      {
        value: 'S9176',
        text: '预售报价单',
        children: [
          {
            value: '44444444',
            text: '4444444',
          },
        ],
      },
      {
        value: 'S11188',
        text: '复制报价单B',
        children: [
          {
            value: '5555555',
            text: '5555555',
          },
        ],
      },
      {
        value: 'S11189',
        text: '复制报价单C',
        children: [
          {
            value: '666666',
            text: '6666666',
          },
        ],
      },
    ],
  },
  {
    value: 'T12469',
    text: '喵喵分仓二',
    children: [
      {
        value: 'S8443',
        text: '蔬菜报价单',
        children: [
          {
            value: '88888',
            text: '888888',
          },
          {
            value: '99999',
            text: '99999',
          },
        ],
      },
    ],
  },
]

const selectData = [
  { value: 1, text: '深圳' },
  { value: 2, text: '罗湖' },
  { value: 3, text: '南山' },
  { value: 4, text: '宝安' },
  { value: 5, text: '福田' },
  { value: 6, text: '龙岗' },
]

const store = observable({
  datas,
  values: ['Mr.', 'Micheal', 'Jordan'],
  setValues(values: string[]) {
    this.values = values
  },
  couplingData,
  couplingValues: ['T7936', 'S11186', '777777'],
  setCouplingValues(values: string[]) {
    this.couplingValues = values
  },
})

const selectStore = observable({
  data: selectData,
  value: null,
  pickerv1Value: undefined,
  setValue(v: any) {
    this.value = v
  },
  onPickerv1Change(pickerv1Value: string) {
    this.pickerv1Value = pickerv1Value
  },
})

const picker = () => {
  return (
    <Picker
      datas={store.datas.slice()}
      values={store.values.slice()}
      onChange={(values) => {
        store.setValues(values)
      }}
      renderOption={(index, option) => {
        if (index === 1) {
          return (
            <View>
              {option.value} <Text style={{ color: 'red' }}>red</Text>
            </View>
          )
        }
        return option.value
      }}
    />
  )
}

export default observer(observer)
```
```tsx
import React from 'react'
import Picker from './component/picker'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import ConfirmPicker from './confirm_picker'
import ConfirmCouplingPicker from './confirm_coupling_picker'
import SelectPicker from './select_picker'
import { default as TempPickerV1 } from './picker_v1'
import { View } from '../view'
import { Button } from '../button'
import { Text } from '../text'

const datas = [
  [
    { value: 'Mr.', text: 'Mr.' },
    { value: 'Mrs.', text: 'Mrs.' },
    { value: 'Ms.', text: 'Ms.' },
    {
      value: 'Dr.',
      text: 'Dr.',
    },
  ],
  [
    { value: 'John', text: 'John' },
    { value: 'Micheal', text: 'Micheal' },
    {
      value: 'Elizabeth',
      text: 'Elizabeth',
    },
  ],
  [
    { value: 'Lennon', text: 'Lennon' },
    { value: 'Jackson', text: 'Jackson' },
    {
      value: 'Jordan',
      text: 'Jordan',
    },
    { value: 'Legend', text: 'Legend' },
    { value: 'Taylor', text: 'Taylor' },
  ],
]

const couplingData = [
  {
    value: 'T11660',
    text: '喵喵分仓一',
    children: [
      {
        value: 'S8058',
        text: '综合商品-喵喵分仓一',
        children: [
          {
            value: '00000',
            text: '000000',
          },
        ],
      },
    ],
  },
  {
    value: 'T7936',
    text: '喵喵总仓',
    children: [
      {
        value: 'S8056',
        text: '综合商品',
        children: [
          {
            value: '11111',
            text: '111111',
          },
        ],
      },
      {
        value: 'S11186',
        text: '复制报价单',
        children: [
          {
            value: '2222222',
            text: '222222',
          },
          {
            value: '777777',
            text: '777777',
          },
        ],
      },
      {
        value: 'S11226',
        text: '复制报价单D',
        children: [
          {
            value: '333333',
            text: '33333333',
          },
        ],
      },
      {
        value: 'S9176',
        text: '预售报价单',
        children: [
          {
            value: '44444444',
            text: '4444444',
          },
        ],
      },
      {
        value: 'S11188',
        text: '复制报价单B',
        children: [
          {
            value: '5555555',
            text: '5555555',
          },
        ],
      },
      {
        value: 'S11189',
        text: '复制报价单C',
        children: [
          {
            value: '666666',
            text: '6666666',
          },
        ],
      },
    ],
  },
  {
    value: 'T12469',
    text: '喵喵分仓二',
    children: [
      {
        value: 'S8443',
        text: '蔬菜报价单',
        children: [
          {
            value: '88888',
            text: '888888',
          },
          {
            value: '99999',
            text: '99999',
          },
        ],
      },
    ],
  },
]

const selectData = [
  { value: 1, text: '深圳' },
  { value: 2, text: '罗湖' },
  { value: 3, text: '南山' },
  { value: 4, text: '宝安' },
  { value: 5, text: '福田' },
  { value: 6, text: '龙岗' },
]

const store = observable({
  datas,
  values: ['Mr.', 'Micheal', 'Jordan'],
  setValues(values: string[]) {
    this.values = values
  },
  couplingData,
  couplingValues: ['T7936', 'S11186', '777777'],
  setCouplingValues(values: string[]) {
    this.couplingValues = values
  },
})

const selectStore = observable({
  data: selectData,
  value: null,
  pickerv1Value: undefined,
  setValue(v: any) {
    this.value = v
  },
  onPickerv1Change(pickerv1Value: string) {
    this.pickerv1Value = pickerv1Value
  },
})
const headers = ['one', 'two', 'three']
const confirmPicker = () => {
  const handleClick = () => {
    ConfirmPicker.render({
      title: 'confirm picker',
      datas: store.datas.slice(),
      values: store.values.slice(),
      headers,
    }).then(
      (values) => {
        console.log('resolve', values)
        store.setValues(values)
        return null
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <Button onClick={handleClick}>confirm picker</Button>
}
export default observer(confirmPicker)
```

```tsx
import React from 'react'
import Picker from './component/picker'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import ConfirmPicker from './confirm_picker'
import ConfirmCouplingPicker from './confirm_coupling_picker'
import SelectPicker from './select_picker'
import { default as TempPickerV1 } from './picker_v1'
import { View } from '../view'
import { Button } from '../button'
import { Text } from '../text'

const datas = [
  [
    { value: 'Mr.', text: 'Mr.' },
    { value: 'Mrs.', text: 'Mrs.' },
    { value: 'Ms.', text: 'Ms.' },
    {
      value: 'Dr.',
      text: 'Dr.',
    },
  ],
  [
    { value: 'John', text: 'John' },
    { value: 'Micheal', text: 'Micheal' },
    {
      value: 'Elizabeth',
      text: 'Elizabeth',
    },
  ],
  [
    { value: 'Lennon', text: 'Lennon' },
    { value: 'Jackson', text: 'Jackson' },
    {
      value: 'Jordan',
      text: 'Jordan',
    },
    { value: 'Legend', text: 'Legend' },
    { value: 'Taylor', text: 'Taylor' },
  ],
]

const couplingData = [
  {
    value: 'T11660',
    text: '喵喵分仓一',
    children: [
      {
        value: 'S8058',
        text: '综合商品-喵喵分仓一',
        children: [
          {
            value: '00000',
            text: '000000',
          },
        ],
      },
    ],
  },
  {
    value: 'T7936',
    text: '喵喵总仓',
    children: [
      {
        value: 'S8056',
        text: '综合商品',
        children: [
          {
            value: '11111',
            text: '111111',
          },
        ],
      },
      {
        value: 'S11186',
        text: '复制报价单',
        children: [
          {
            value: '2222222',
            text: '222222',
          },
          {
            value: '777777',
            text: '777777',
          },
        ],
      },
      {
        value: 'S11226',
        text: '复制报价单D',
        children: [
          {
            value: '333333',
            text: '33333333',
          },
        ],
      },
      {
        value: 'S9176',
        text: '预售报价单',
        children: [
          {
            value: '44444444',
            text: '4444444',
          },
        ],
      },
      {
        value: 'S11188',
        text: '复制报价单B',
        children: [
          {
            value: '5555555',
            text: '5555555',
          },
        ],
      },
      {
        value: 'S11189',
        text: '复制报价单C',
        children: [
          {
            value: '666666',
            text: '6666666',
          },
        ],
      },
    ],
  },
  {
    value: 'T12469',
    text: '喵喵分仓二',
    children: [
      {
        value: 'S8443',
        text: '蔬菜报价单',
        children: [
          {
            value: '88888',
            text: '888888',
          },
          {
            value: '99999',
            text: '99999',
          },
        ],
      },
    ],
  },
]

const selectData = [
  { value: 1, text: '深圳' },
  { value: 2, text: '罗湖' },
  { value: 3, text: '南山' },
  { value: 4, text: '宝安' },
  { value: 5, text: '福田' },
  { value: 6, text: '龙岗' },
]

const store = observable({
  datas,
  values: ['Mr.', 'Micheal', 'Jordan'],
  setValues(values: string[]) {
    this.values = values
  },
  couplingData,
  couplingValues: ['T7936', 'S11186', '777777'],
  setCouplingValues(values: string[]) {
    this.couplingValues = values
  },
})

const selectStore = observable({
  data: selectData,
  value: null,
  pickerv1Value: undefined,
  setValue(v: any) {
    this.value = v
  },
  onPickerv1Change(pickerv1Value: string) {
    this.pickerv1Value = pickerv1Value
  },
})
const confirmCouplingPicker = () => {
  const handleClick = () => {
    ConfirmCouplingPicker.render({
      datas: store.couplingData.slice(),
      values: store.couplingValues.slice(),
    }).then(
      (values) => {
        console.log('resolve', values)
        store.setCouplingValues(values)
        return null
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <Button onClick={handleClick}>confirm coupling picker</Button>
}

export default observer(confirmCouplingPicker)
```

```tsx
import React from 'react'
import Picker from './component/picker'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import ConfirmPicker from './confirm_picker'
import ConfirmCouplingPicker from './confirm_coupling_picker'
import SelectPicker from './select_picker'
import { default as TempPickerV1 } from './picker_v1'
import { View } from '../view'
import { Button } from '../button'
import { Text } from '../text'

const datas = [
  [
    { value: 'Mr.', text: 'Mr.' },
    { value: 'Mrs.', text: 'Mrs.' },
    { value: 'Ms.', text: 'Ms.' },
    {
      value: 'Dr.',
      text: 'Dr.',
    },
  ],
  [
    { value: 'John', text: 'John' },
    { value: 'Micheal', text: 'Micheal' },
    {
      value: 'Elizabeth',
      text: 'Elizabeth',
    },
  ],
  [
    { value: 'Lennon', text: 'Lennon' },
    { value: 'Jackson', text: 'Jackson' },
    {
      value: 'Jordan',
      text: 'Jordan',
    },
    { value: 'Legend', text: 'Legend' },
    { value: 'Taylor', text: 'Taylor' },
  ],
]

const couplingData = [
  {
    value: 'T11660',
    text: '喵喵分仓一',
    children: [
      {
        value: 'S8058',
        text: '综合商品-喵喵分仓一',
        children: [
          {
            value: '00000',
            text: '000000',
          },
        ],
      },
    ],
  },
  {
    value: 'T7936',
    text: '喵喵总仓',
    children: [
      {
        value: 'S8056',
        text: '综合商品',
        children: [
          {
            value: '11111',
            text: '111111',
          },
        ],
      },
      {
        value: 'S11186',
        text: '复制报价单',
        children: [
          {
            value: '2222222',
            text: '222222',
          },
          {
            value: '777777',
            text: '777777',
          },
        ],
      },
      {
        value: 'S11226',
        text: '复制报价单D',
        children: [
          {
            value: '333333',
            text: '33333333',
          },
        ],
      },
      {
        value: 'S9176',
        text: '预售报价单',
        children: [
          {
            value: '44444444',
            text: '4444444',
          },
        ],
      },
      {
        value: 'S11188',
        text: '复制报价单B',
        children: [
          {
            value: '5555555',
            text: '5555555',
          },
        ],
      },
      {
        value: 'S11189',
        text: '复制报价单C',
        children: [
          {
            value: '666666',
            text: '6666666',
          },
        ],
      },
    ],
  },
  {
    value: 'T12469',
    text: '喵喵分仓二',
    children: [
      {
        value: 'S8443',
        text: '蔬菜报价单',
        children: [
          {
            value: '88888',
            text: '888888',
          },
          {
            value: '99999',
            text: '99999',
          },
        ],
      },
    ],
  },
]

const selectData = [
  { value: 1, text: '深圳' },
  { value: 2, text: '罗湖' },
  { value: 3, text: '南山' },
  { value: 4, text: '宝安' },
  { value: 5, text: '福田' },
  { value: 6, text: '龙岗' },
]

const store = observable({
  datas,
  values: ['Mr.', 'Micheal', 'Jordan'],
  setValues(values: string[]) {
    this.values = values
  },
  couplingData,
  couplingValues: ['T7936', 'S11186', '777777'],
  setCouplingValues(values: string[]) {
    this.couplingValues = values
  },
})

const selectStore = observable({
  data: selectData,
  value: null,
  pickerv1Value: undefined,
  setValue(v: any) {
    this.value = v
  },
  onPickerv1Change(pickerv1Value: string) {
    this.pickerv1Value = pickerv1Value
  },
})
const selectPicker = () => {
  const handleClick = () => {
    SelectPicker.render({
      data: selectStore.data.slice(),
      value: selectStore.value,
    }).then(
      (value) => {
        console.log('resolve', value)
        selectStore.setValue(value)
        return null
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <Button onClick={handleClick}>select picker</Button>
}
export default observer(selectPicker)
```

```tsx

import React from 'react'
import Picker from './component/picker'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import ConfirmPicker from './confirm_picker'
import ConfirmCouplingPicker from './confirm_coupling_picker'
import SelectPicker from './select_picker'
import { default as TempPickerV1 } from './picker_v1'
import { View } from '../view'
import { Button } from '../button'
import { Text } from '../text'

const datas = [
  [
    { value: 'Mr.', text: 'Mr.' },
    { value: 'Mrs.', text: 'Mrs.' },
    { value: 'Ms.', text: 'Ms.' },
    {
      value: 'Dr.',
      text: 'Dr.',
    },
  ],
  [
    { value: 'John', text: 'John' },
    { value: 'Micheal', text: 'Micheal' },
    {
      value: 'Elizabeth',
      text: 'Elizabeth',
    },
  ],
  [
    { value: 'Lennon', text: 'Lennon' },
    { value: 'Jackson', text: 'Jackson' },
    {
      value: 'Jordan',
      text: 'Jordan',
    },
    { value: 'Legend', text: 'Legend' },
    { value: 'Taylor', text: 'Taylor' },
  ],
]

const couplingData = [
  {
    value: 'T11660',
    text: '喵喵分仓一',
    children: [
      {
        value: 'S8058',
        text: '综合商品-喵喵分仓一',
        children: [
          {
            value: '00000',
            text: '000000',
          },
        ],
      },
    ],
  },
  {
    value: 'T7936',
    text: '喵喵总仓',
    children: [
      {
        value: 'S8056',
        text: '综合商品',
        children: [
          {
            value: '11111',
            text: '111111',
          },
        ],
      },
      {
        value: 'S11186',
        text: '复制报价单',
        children: [
          {
            value: '2222222',
            text: '222222',
          },
          {
            value: '777777',
            text: '777777',
          },
        ],
      },
      {
        value: 'S11226',
        text: '复制报价单D',
        children: [
          {
            value: '333333',
            text: '33333333',
          },
        ],
      },
      {
        value: 'S9176',
        text: '预售报价单',
        children: [
          {
            value: '44444444',
            text: '4444444',
          },
        ],
      },
      {
        value: 'S11188',
        text: '复制报价单B',
        children: [
          {
            value: '5555555',
            text: '5555555',
          },
        ],
      },
      {
        value: 'S11189',
        text: '复制报价单C',
        children: [
          {
            value: '666666',
            text: '6666666',
          },
        ],
      },
    ],
  },
  {
    value: 'T12469',
    text: '喵喵分仓二',
    children: [
      {
        value: 'S8443',
        text: '蔬菜报价单',
        children: [
          {
            value: '88888',
            text: '888888',
          },
          {
            value: '99999',
            text: '99999',
          },
        ],
      },
    ],
  },
]

const selectData = [
  { value: 1, text: '深圳' },
  { value: 2, text: '罗湖' },
  { value: 3, text: '南山' },
  { value: 4, text: '宝安' },
  { value: 5, text: '福田' },
  { value: 6, text: '龙岗' },
]

const store = observable({
  datas,
  values: ['Mr.', 'Micheal', 'Jordan'],
  setValues(values: string[]) {
    this.values = values
  },
  couplingData,
  couplingValues: ['T7936', 'S11186', '777777'],
  setCouplingValues(values: string[]) {
    this.couplingValues = values
  },
})

const selectStore = observable({
  data: selectData,
  value: null,
  pickerv1Value: undefined,
  setValue(v: any) {
    this.value = v
  },
  onPickerv1Change(pickerv1Value: string) {
    this.pickerv1Value = pickerv1Value
  },
})
const PickerV1 = () => {
  return (
    <TempPickerV1<string>
      data={selectStore.data.slice()}
      value={selectStore.pickerv1Value}
      onChange={(value) => selectStore.onPickerv1Change(value)}
      valueArr={false}
      placeholder='请选择区域'
    />
  )
}

export default observer(PickerV1)
```
