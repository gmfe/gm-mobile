export default class Btn {
  /** 按钮文本 */
  label?: string
  /** 按钮占位，默认1个位置 */
  flex?: number
  /** 自定义类名 */
  className?: string
  /** 按钮功能,传入value为输入框当前值，返回一个按钮功能处理后的值 */
  fn?: (value: string) => string
  constructor({ label = '', flex = 0, className = '', fn }: Btn) {
    if (!fn && /([0-9])/.test(label)) {
      fn = (value = '') => value + label
    }
    Object.assign(this, { label, flex, className, fn })
  }
}
