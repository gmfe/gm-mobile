# 业务/Signature

```tsx

import Signature from '.'

const View = () => {
  return (
    <Signature
      output='blob'
      image='https://image.document.guanmai.cn/product_img/1588907508246-058712363353500274.png'
      onSave={(blob) => {
        console.log(blob)
      }}
    />
  )
}
export default View
```
```tsx
import Signature from '.'
const Edit = () => {
  return (
    <Signature
      output='blob'
      isEdit
      onSave={(blob) => {
        console.log(blob)
      }}
    />
  )
}

export default Edit
```
