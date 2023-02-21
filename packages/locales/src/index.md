
```tsx
import React from 'react'
import { storiesOf } from '@storybook/react'
import { setLocale } from './index'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const l = localStorage.getItem('_gm-mobile_' + 'lng')

const store = observable({
  lng: (l ? JSON.parse(l) : '') || 'zh',
})

const Demo =  (
  <select
    value={store.lng}
    onChange={(e) => {
      localStorage.setItem(
        '_gm-mobile_' + 'lng',
        JSON.stringify(e.target.value)
      )
      setLocale(e.target.value)
      store.lng = e.target.value
    }}
    style={{ verticalAlign: 'middle' }}
  >
    <option value='en'>English</option>
    <option value='zh'>中文</option>
  </select>
)

export default observer(Demo)
```