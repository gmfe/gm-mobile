import { Events as TaroEvents } from '@tarojs/taro'

const TaroEvent = new TaroEvents()

const Events = {
  add(eventName: string, handler: (event: Event) => any) {
    TaroEvent.on(eventName, handler)
  },
  dispatch(eventName: string, detail?: any) {
    TaroEvent.trigger(eventName, { detail })
  },
  remove(eventName: string, handler: (event: Event) => any) {
    TaroEvent.off(eventName, handler)
  },
}

export default Events
