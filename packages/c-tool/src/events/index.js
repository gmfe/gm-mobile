import is from '../is'
import EVENT from './event'

const isWeApp = is.weApp()

const EVENT_ON = (eventName, handler) => {
  if (isWeApp) {
    EVENT.on(eventName, handler)
  } else {
    EVENT.addEventListener(eventName, handler)
  }
}

const EVENT_TRIGGER = (eventName, detail) => {
  if (isWeApp) {
    EVENT.trigger(eventName, { detail })
  } else {
    EVENT.dispatchEvent(new window.CustomEvent(eventName, { detail }))
  }
}

const EVENT_OFF = (eventName, handler) => {
  if (isWeApp) {
    EVENT.off(eventName, handler)
  } else {
    EVENT.removeEventListener(eventName, handler)
  }
}

const Events = {
  on: EVENT_ON,
  trigger: EVENT_TRIGGER,
  off: EVENT_OFF,
}

export default Events
