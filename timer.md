## Measuring performance

```javascript
// precise-time.js
// Return precise time in milliseconds, good for benchmarking

function PreciseTime () {
  const [_, nanoseconds] = process.hrtime()

    // Time is an array [seconds, nanoseconds]
  return nanoseconds / 1000000
}

module.exports = PreciseTime
```
