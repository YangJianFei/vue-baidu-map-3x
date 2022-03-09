import events from './events.js'

export default function (instance, eventList) {
  const ev = eventList || events[this.$options.name]
  ev && ev.forEach(event => {
    const hasOn = event.slice(0, 2) === 'on'
    const eventName = hasOn ? event.slice(2) : event
    const listener = this.$attrs[eventName]
    listener && instance.addEventListener(event, listener.fns)
  })
}
