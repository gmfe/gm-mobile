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
        username: 'qucaigou001',
        password: 'liuge1',
    })
    .post()

Request('https://bshop.guanmai.cn/user/account').get()
```
