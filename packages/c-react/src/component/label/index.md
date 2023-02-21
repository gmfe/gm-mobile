# 基础/Label
```tsx
import React from 'react'
import { Label } from './index'
import { View } from '../view'

const normal = () => (
  <View>
    <Label text='默认' />
  </View>
)

export default normal
```
```tsx
import React from 'react'
import { Label } from './index'
import { View } from '../view'
const primary = () => (
  <View>
    <Label text='自提' type='primary' />
  </View>
)

export default primary
```
```tsx
import React from 'react'
import { Label } from './index'
import { View } from '../view'
const plain = () => (
  <View>
    <Label text='限购' type='plain' />
  </View>
)

export default plain
```
```tsx
import React from 'react'
import { Label } from './index'
import { View } from '../view'

 const accent = () => (
  <View>
    <Label text='组合商品' type='accent' />
  </View>
)

export default accent
```

