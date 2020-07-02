const EventBus = {
  add(eventName, handler) {
    window.addEventListener(eventName, handler)
  },
  dispatch(eventName, detail) {
    window.dispatchEvent(new window.CustomEvent(eventName, { detail }))
  },
  remove(eventName, handler) {
    window.removeEventListener(eventName, handler)
  },
}

export default EventBus
