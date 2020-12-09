import { Events } from '@tarojs/taro'

const events = new Events()

const EventBus = {
  add(eventName, handler) {
    events.on(eventName, handler)
  },
  dispatch(eventName, detail) {
    events.trigger(eventName, { detail })
  },
  remove(eventName, handler) {
    events.off(eventName, handler)
  },
}

export default EventBus
