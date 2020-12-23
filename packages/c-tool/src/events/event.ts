// 自定义事件
const Events = {
  add<ED = any>(
    eventName: string,
    handler: (event: CustomEvent<ED>) => unknown
  ): void {
    window.addEventListener(eventName, handler as EventListener)
  },
  dispatch<ED = any>(eventName: string, detail?: ED): void {
    window.dispatchEvent(new window.CustomEvent(eventName, { detail }))
  },
  remove<ED = any>(
    eventName: string,
    handler: (event: CustomEvent<ED>) => unknown
  ): void {
    window.removeEventListener(eventName, handler as EventListener)
  },
}

export default Events
