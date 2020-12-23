import { Events as TaroEvents } from '@tarojs/taro'

const TaroEvent = new TaroEvents()

const Events = {
  add<ED = any>(
    eventName: string,
    handler: (event: CustomEvent<ED>) => unknown
  ): void {
    TaroEvent.on(eventName, handler)
  },
  dispatch<ED = any>(eventName: string, detail?: ED): void {
    TaroEvent.trigger(eventName, { detail })
  },
  remove<ED = any>(
    eventName: string,
    handler: (event: CustomEvent<ED>) => unknown
  ): void {
    TaroEvent.off(eventName, handler)
  },
}

export default Events
