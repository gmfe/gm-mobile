```tsx
import {Button, ButtonTime, View, ButtonProps} from '@gm-mobile/c-react'


function handleClick(): Promise<void> {
  console.log('click')
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, 2000)
  )
}

const Normal: FC<ButtonProps> = (args) => (
  <View>
    默认
    <View>
      <Button {...args}>默认</Button>

      <Button {...args} type='primary'>
        主色
      </Button>
      <Button {...args} type='danger'>
        危险
      </Button>
      <Button
        {...args}
        type='link'
        onClick={() => {
          window.open('https://www.google.com')
        }}
      >
        Link
      </Button>
    </View>
    plain
    <View>
      <Button {...args} plain>
        默认
      </Button>
    </View>
    disabled
    <View>
      <Button {...args} disabled>
        默认
      </Button>
    </View>
    size
    <View>
      <Button {...args} mini>
        默认
      </Button>
      <Button {...args} mini>
        小按钮
      </Button>
      <Button {...args} mini type='link'>
        Link
      </Button>
      <Button {...args} mini type='link' className='m-text'>
        纯文字
      </Button>
    </View>
    block
    <View>
      <Button {...args} block type='primary' round>
        主色
      </Button>
      <Button {...args} block mini plain>
        主色
      </Button>
    </View>
    <View>
      <Button {...args} type='primary'>
        主色
      </Button>
    </View>
    loading
    <View>
      <Button {...args} loading>
        加载中
      </Button>
    </View>
    onClick promise
    <View>
      <Button {...args} onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button {...args} type='primary' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button {...args} type='danger' onClick={handleClick}>
        点击显示 loading
      </Button>
    </View>
    <View>
      <View>输入项不为空，才允许计时(通过onClick事件控制)</View>
      <ButtonTime
        {...args}
        mini
        time={10}
        type='primary'
        onClick={() => {
          // 阻止 false or promise reject
          return false
        }}
      >
        获取验证码。阻止
      </ButtonTime>
    </View>
    <View>
      <View>异步计时(通过onClick事件控制)</View>
      <ButtonTime {...args} time={10} type='primary' onClick={handleClick}>
        获取验证码
      </ButtonTime>
    </View>
  </View>
)

export default Normal
```
