Running stuff at certain interval (pooling, etc).

```js
function SomeFunction () {
    let interval

    function fn () {
        // Some work to run at every interval
    }

    return {
        subscribe ({ duration: 300 }) => {
            interval && window.clearInterval(interval)
            interval = window.setInterval(() => {
                fn && fn()
            }, duration)
            return interval
        }
        unsubscribe (interval) {
            window.clearInterval(interval)
            interval = null
        }
    }
}

let someFunction = SomeFunction()
let interval = someFunction.subscribe({ duration: 300 })
someFunction.unsubscribe(interval)
```
