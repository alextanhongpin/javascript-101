// Heartbeat Pattern, use to monitor long running processes (worker) so that the client know that the process is still alive.

class Heartbeat {
  constructor () {
    this.beats = 0
    this.start = Date.now()
    this.end = null
    this.lastTimestamp = this.start
    this.heartbeat_interval = 2000
  }
  checkPulse () {
    if (Date.now() - this.lastTimestamp > this.heartbeat_interval) {
      this.end = Date.now()
      this.lastTimestamp = this.end
      this.beats += 1
      console.log('ping!', new Date(this.lastTimestamp))
    }
  }
  duration () {
    return (this.end - this.start) / 1000
  }
  info () {
    // TODO: Prettify date
    return [this.beats, new Date(this.start), new Date(this.end), this.duration() + 's']
  }
}

let counter = 0
let isWorking = false
const beat = new Heartbeat()

function loop () {
  beat.checkPulse()

  // Perform asynchronous task here
  setTimeout(() => {
    isWorking = false
  }, 10)

  counter++
  return counter
}

const interval = setInterval(() => {
  if (isWorking) return
  const isTerminationCondition = loop() === 100
  if (isTerminationCondition) {
    clearInterval(interval)
    console.log(beat.info())
  }
}, 100)
