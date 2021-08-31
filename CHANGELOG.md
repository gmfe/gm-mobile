
# 3.8.3
## c-react fix
1. tabs项active后再次点击不应再触发onChange
# ts
## breaking change

InputProps form => isForm
TextAreaProps form => isForm
LayoutRoot TYPE => Type
TabDateSelect value 字段类型: any =》 string


# 3.8.0

## c-react add
1. 增加LayoutV1，用于支持PopupV1多个弹框
2. 增加PopupV1
- 支持多个弹框
- render会返回hide函数，可以关闭该弹框
- hide(PopUpId: string)可以关闭特定Popup，一般不用到
- 增加center(boolean),即弹框在中间

3. 增加PickerV1
- 支持自动显示选中后的文本
- 主要提供value和onChange
- valueArr(boolean)用于onChange返回array或者string
- 增加center(boolean),即弹框在中间

4. 增加Form受控表单（用法和gm-pc一样）
5. Tabs组件增加泛型



# 2.x

增加 小程序

## breaking change

Toast 废弃 info danger 方法

Cell 废弃 href，跳转自主处理

原ScrollIntoView -> FormScrollIntoView

新增通用 ScrollIntoView

Calendar 废弃 apiScrollToSelected, 默认自动滚到选择处

MutiOrderReceiveTimePicker 更正 -> MultiOrderReceiveTimePicker

package service_time 更正 -> service-time

# 1.x

## change

较 react-mgm 的变动

新增 Button

Page 新增 top

新增 Badge

新增 Keyboard 数字键盘

新增 Tabs 多种形式，props 有变化

counter 改变形式, props 有变化

Calendar 提供多种选择类型，props 有变化

## breaking change

Dialog 移除 show

Popup 移除 show

Mask 移除 show

Loading 移除 line

Toast 移除 loading_linear

Dialog.dialog =》 Dialog.render

less 变量全部取消，改 css 变量，且提供 CSSVariable 获取各种值

增加前缀，比如 text-12 => m-bg-back

Storage 的 key 从 react-gmm => gm-mobile，记得做迁移

废除 SearchBar

废除 Select， 提供 SelectPicker，代替原本 Select.render()

废除 Textarea

废除 InputNumber

重新设置 Cell

原有 Radio => Checkbox, 提供新的 Radio

LazyImg => Lazy，脱离 img

Storage => LocalStorage SessionStorage

Popup 关闭需要提供 onHide

移除 Slide SlideLess

移除 Infinite，转用 Scroll，

LetterIndex, LetterIndexMultiple 移除 getFirstLetter

原 LetterIndexMultiple 底部按钮调整，在 business 模块新增 ProductSelection

