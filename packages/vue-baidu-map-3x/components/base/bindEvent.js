import events from './events.js'

export default function (instance, eventList) {
  const ev = eventList || events[this.$options.name]
  ev && ev.forEach(event => {
    const hasOn = event.slice(0, 2) === 'on'
    let eventName = hasOn ? event.slice(2) : event
    const listener = this.$attrs['on' + eventName.replace(eventName[0], eventName[0].toUpperCase())]
    listener && instance.addEventListener(event, listener)
  })
}
