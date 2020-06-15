# `mp-request`

## TODO
 - 中间件
 - 文件上传

## Usage

```
// 暂不支持文件上传
import { Request } = '@gm-mobile/mp-request'

Request('https://bshop.guanmai.cn/login')
    .code([0])
    .data({
        username: '44545',
        password: '454545',
    })
    .post()

Request('https://bshop.guanmai.cn/user/account').get()
```
