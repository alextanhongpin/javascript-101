## Throttle using higher-order-functions

```javascript
function makeThrottle (duration) {
  let timeout

  return function (fn) {  
    timeout && window.clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      fn && fn()
    }, duration)
  }
}

// Usage
let throttle = makeThrottle(500)
throttle(() => {
  console.log('got throttled!')
})
```
