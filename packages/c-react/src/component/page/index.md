# 布局/Page

```tsx
import React from 'react'
import { View } from '../view'
import { Page } from '.'

const normal = () => {
  return (
    <Page
      header={<View>header</View>}
      tabbar={<View>tabbar</View>}
      top={<View>top</View>}
      bottom={<View>bottom</View>}
    >
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
      <View>da</View>
    </Page>
  )
}

export default normal
```

```tsx
import React from 'react'
import { View } from '../view'
import { Page } from '.'
const loading = () => {
  return <Page loading>loading</Page>
}

export default loading
```

```tsx
import React from 'react'
import { View } from '../view'
import { Page } from '.'
const error = () => {
  return <Page error>error</Page>
}

export default error
```

