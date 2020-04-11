# 较 react-mgm 的变动

新增 Button

Page 新增 top

Dialog 移除 show

Popup 移除 show

Mask 移除 show

## breaking change

less 变量全部取消，改 css 变量，且提供 CSSVariable 获取各种值

增加前缀，比如 text-12 => m-bg-back

LayoutRoot => LayerRoot

Storage 的 key 从 react-gmm => gm-mobile，记得做迁移

废除 SearchBar

废除 Select， 提供 SelectPicker，代替原本 Select.render()

废除 Textarea
