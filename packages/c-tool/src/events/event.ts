const Events = {
  add(eventName: string, handler: (event: Event) => any) {
    window.addEventListener(eventName, handler)
  },
  dispatch(eventName: string, detail?: any) {
    window.dispatchEvent(new window.CustomEvent(eventName, { detail }))
  },
  remove(eventName: string, handler: (event: Event) => any) {
    window.removeEventListener(eventName, handler)
  },
}

export default Events
