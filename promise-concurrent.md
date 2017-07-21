# Promise Concurrent


You can run task concurrently using promise. Let's demonstrate an example:
```javascript
function worker (i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i)
    }, 2000)
  })
}
```

Above, we have a worker that returns a promise and an integer that is assigned to it. Each worker created will take roughly 2 seconds to complete.
If we run the example below, it should take roughly 2 seconds to complete all the workers, and not 20 seconds as all the workers are being executed at the same time.

```javascript
const promises = Array(10).fill(0).map((_, i) => {
  return worker(i)
})

console.time('Benchmark')
Promise.all(promises).then((data) => {
  console.log('Done', data)
  console.timeEnd('Benchmark')
}).catch(console.error)
```

## Throttling promises

When you are using `Promise.all`, you might hit an error when the number of items to be processed concurrently becomes huge.
Below is an implementation on throttling promises (limiting the number of concurrent processes running at a specific time). You can also use `Bluebird` promise library that comes with the option to limit concurrency.
```javascript
function worker (i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i)
    }, 2000)
  })
}

function concurrency (input, fn, opts) {
  let slices = []
  while (input.length) {
    slices.push(input.splice(0, opts.limit))
  }
  return slices.reduce((p, slice) => {
    return p.then((data) => {
      return Promise.all(slice.map(fn)).then((result) => {
        return data.concat(result)
      })
    })
  }, Promise.resolve([]))
}

const input = Array(100).fill(0).map((_, i) => i)
console.time('start')
concurrency(input, worker, {
  limit: 10 // Limit to processing 10 items at once
}).then((data) => {
  console.log('data', data)
  console.timeEnd('start')
})
```
