# Promise 101

## Glossary 

- __promise__:The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
- __callback__: A convention of writing functions that handles the results that will be returned in future time.
- __async__: The word 'asynchronous', aka 'async' just means 'takes some time' or 'happens in the future, not right now.


## Why Promise

To answer this, let's look at JavaScript's `callback`. We have a function that processes sum asynchronously, and accepts a callback to handle the response:

```javascript
function sumAsync (x, y, cb) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    return cb(new Error('Can only add numbers'))
  }
  setTimeout(() => {
    return cb(null, x + y)
  }, Math.random() * 1500 + 500)
}
```

To call this function:
```javascript
// console.time('benchmarkTime')
sumAsync(1, 2, (err, value) => {
  // This is our callback function. It will be executed once the process completes.
  if (err) {
    console.log(err)
    return
  }
  console.log('1 + 2 =', value)
  // console.timeEnd('benchmarkTime')
})

sumAsync(3, 4, (err, value) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('3 + 4 =', value)
})
```

What happens here?
1. We have a function that sums two integers asynchronously. 
2. We randomize the time taken to return the results to mimic an asynchronous process.
3. We have two functions running asynchronously.
4. When you execute the example, the order of the results return might be different than you think. You might get this:

```bash
3 + 4 = 7
1 + 2 = 3
```

instead of this:

```bash
1 + 2 = 3
3 + 4 = 7
```

Due to the async nature of JavaScript, we need to change the way we write this code. One possible way is to nest the callbacks:

```javascript
sumAsync(1, 2, (err, value) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('1 + 2 =', value)
  sumAsync(3, 4, (err, value) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('3 + 4 =', value)
  })
})
```
The orders of the results returned will be the expected order. But now we have a few problems:

1. More functions leads to more nested callbacks
2. For each nested callbacks, we need to handle the errors
3. Tight coupling between logic. Removing one layer will cause unexpected behaviours

And all of this lead to the dreadful `callback hell`. 

How can we do better? Enter `promises`. Let's convert our sum async to a promise.

```javascript
// promisified version of sumAsyn
function sumAsyncPromise (x, y) {
  return new Promise((resolve, reject) => {
    sumAsync(x, y, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}
```

In the `sumAsyncPromise` function, we return a new `Promise` object which has two additional functions, `resolve` and `reject`.
We call `resolve` on the result upon success response, and `reject` on errors.

The `resolve` will be captured in the `then` promise chain, while the `errors` in the `catch` promise chain. This is how you will execute a promise:
```javascript
sumAsyncPromise(1, 2).then(result => {
  console.log('1 + 2 =', result)
}).catch(err => {
  console.log(err)
})
```

To trigger multiple promises, you can just chain them together:

```javascript
sumAsyncPromise(1, 2).then(result => {
  console.log('1 + 2 =', result)
  return sumAsyncPromise(3, 4)
}).then(result => {
  console.log('3 + 4 =', result)
})
.catch(err => {
  console.log(err)
})
```

The beautiful part about promises is that when you chain multiple promises, you only handle them in one place.
Therefore, it's suitable if you are chaining a pipeline where each step is a condition that has to be fulfilled.
Note that if any of the promise chain throws an error, it will exit straight to the catch statement, without going through other promises.
Depending on the situation, it can be a disadvantage.
