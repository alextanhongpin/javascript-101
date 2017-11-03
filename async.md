# Async

If you are already familiar with `Promise`, you will love `async/await` even more.

If you are just getting started with JavaScript, you probably have a misunderstanding on how callback/promise works.

Take a look at this example, what does `sum` and `sumAsync` returns?


```javascript
// synchronous
function sum(a, b) {
  return a + b
}

// asynchronous
function sumAsync(a, b) {
  return new Promise((resolve, reject) => {
    // sumAsync will return the results 300 ms later to mimic a long process or network call
    setTimeout(() => {
      resolve(a + b)
    }, 300)
  })
}

function main () {
  const a = sum(1, 2)
  const b = sumAsync(1, 2)

  console.log(a, b)
}

main()
```

In the example above, `a` will be `3`, but `b` will be a promise.

To get the value of `b`, you have to do this:

```javascript
sumAsync(1, 3).then((b) => {
  console.log(b) // equals 3
})
```

With `async/await`, your code will look similar to the synchronous counterpart:

```javascript
async function  main () {
  const a = sum(1, 2)
  const b = await sumAsync(1, 2)
  console.log(a, b)
}

main().catch(console.error)
```