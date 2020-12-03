import { Events as TaroEvents } from '@tarojs/taro'

const TaroEvent = new TaroEvents()

const Events = {
  add<D = any>(
    eventName: string,
    handler: (event: CustomEvent<D>) => void
  ): void {
    TaroEvent.on(eventName, handler)
  },
  dispatch<D = any>(eventName: string, detail?: D): void {
    TaroEvent.trigger(eventName, { detail })
  },
  remove<D = any>(
    eventName: string,
    handler: (event: CustomEvent<D>) => void
  ): void {
    TaroEvent.off(eventName, handler)
  },
}

export default Events
