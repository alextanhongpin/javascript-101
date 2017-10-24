# Patterns in promises

There are several useful patterns in promises. Let's explore some of them.

## Triggering the chain

It's common to see people starting the promise chain with the `Promise.resolve` rather then the function itself.
It helps to keep the code clean:
```javascript
Promise.resolve(params)
.then(step1)
.then(step2)
// ...
.catch(handleError)
```
rather than:

```javascript
step1()
.then(step2)
// ...
.catch(handleError)
```

The other advantages is, it's easy to interchange the position of the pipelines. 

If you notice, writing it in this way also keeps your pipeline function cleaner - the first pipeline does not have to return a promise. If you use the latter way, then your `step2` function will look like this:

```javascript
function step2() {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
```

With the first approach, you can just return the value and the pipeline will still work fine:
```javascript
function step2() {
  return 1
}
```

## Composing pipelines

One useful promise pattern is composing a pipeline, which is a series of process that is executed one after another. In an `express` application, this is how it might look like:

```javascript
app.post('/books', (req, res) => {
  Promise.resolve(req)
  .then(getParams) // Get the body parameters
  .then(validateParams) // Validate the parameter
  .then(books.create) // Create a new books from the validated parameters
  .then((id) => {
    // 'Successfully created a new book'
    return res.status(201).json({})
  })
  .catch((err) => {
    // Handle error here
    return res.status(400).json({
      error: err.message,
      code: 400
    })
  })
})
```

Chaining promises is useful, since any errors from the promise chain will be handled in the `catch` chain.

## Looping
Compared to callbacks, you can loop promises easily. Try looping this function 10 times using callback:

```javascript
function sumAsync (x1, x2, cb) {
  if (typeof x1 !== 'number' || typeof x2 !== 'number') {
    return cb(new Error('Can only add numbers'))
  }
  setTimeout(() => {
    return cb(null, x1 + x2)
  }, Math.random() * 1500 + 500)
}
```

Here's a possible solution for this:

```javascript
function loopSumAsync (n, cb) {
  // Bad, mutable state
  let results = []
  // i += 1 instead of i++ for micro-optimization
  for (let i = 0; i < n; i += 1) {
    (function (i) {
      sumAsync(i, i + 1, (err, result) => {
        if (err) {
          cb(err)
        }
        results.push(result)
        if (results.length === n) {
          cb(null, results)
        }
      })
    })(i)
  }
}

loopSumAsync(10, (err, result) => {
  if (err) {
    throw err
  }
  console.log('got all results', result)
  // Results not sorted
  // [ 9, 17, 5, 15, 19, 1, 13, 11, 7, 3 ]
})
```

And this is how you do it with promises:

```javascript
// function that converts our sumAsync to return a promise
function sumAsyncPromise (x, y) {
  return new Promise((resolve, reject) => {
    sumAsync(x, y, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const loopPromises = Array(10).fill(0).map((_, index) => {
  // Loop 10 times and create an array of promises
  return sumAsyncPromise(index, index + 1)
})

// Promise.all will resolve an array of promises
Promise.all(loopPromises).then((result) => {
  console.log(result)
  //  Results are in the correct order
  // [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 ]
}).catch((err) => {
  console.log(err)
})
```

The one written with promise is definitely much more readable, mantainable and easier to refactor. It is also `pure`. No states are harmed when looping. Note that the results are returned in the correct order too.
