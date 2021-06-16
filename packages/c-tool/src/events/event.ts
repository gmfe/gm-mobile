// 自定义事件
export const Events = {
  add<D = any>(
    eventName: string,
    handler: (event: CustomEvent<D>) => void
  ): void {
    window.addEventListener(eventName, handler as EventListener)
  },
  dispatch<D = any>(eventName: string, detail?: D): void {
    window.dispatchEvent(new window.CustomEvent(eventName, { detail }))
  },
  remove<D = any>(
    eventName: string,
    handler: (event: CustomEvent<D>) => void
  ): void {
    window.removeEventListener(eventName, handler as EventListener)
  },
}

export default Events
