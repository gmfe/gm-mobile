export class Btn {
  /** 按钮文本 */
  label?: string
  /** 按钮占位，默认1个位置 */
  flex?: number
  /** 自定义类名 */
  className?: string
  /** 按钮功能,传入value为输入框当前值，返回一个按钮功能处理后的值 */
  fn?: (value: string) => string
  type?: 'digit' | 'action'
  constructor({ label = '', flex = 0, className = '', fn }: Btn) {
    this.type = /([0-9.])/.test(label) ? 'digit' : 'action'
    if (!fn && this.type === 'digit') {
      fn = (value = '') => value + label
    }
    Object.assign(this, { label, flex, className, fn })
  }
}

export default Btn
