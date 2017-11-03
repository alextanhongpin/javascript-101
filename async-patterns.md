# Async Patterns


In order to call `await`, it has to be wrapped in an `async` function:

```javascript
function doWork() {
  return Promise.resolve(1)
}

async function main() {
  const value = await doWork()
  console.log(value) // prints 1
}
main().catch(console.error)
```

## Pipelines

Assuming `step1`, `step2` and `step3` are all functions returning a promise, you can construct a pipeline this way:
```javascript
function step1() {
  return Promise.resolve(1)
}

async function main() {
  const a = await step1()
  const b = await step2(a)
  const c = await step3(b)
  console.log(c)
}
main().catch(console.error)
```

## Concurrent

To run multiple work concurrently, you might thought of using a loop:

```javascript
function doWork (i) {
  return new Promise((resolve, reject) => {
    // sumAsync will return the results 300 ms later to mimic a long process or network call
    setTimeout(() => {
      resolve(i)
    }, 300)
  })
}
// Good
async function main() {
  const values = []
  for (let i = 0; i < 10; i++) {
    const value = await doWork(i)
    values.push(value)
  }
  // This will not be printed until doWork is completed
  console.log(values)
}
main().catch(console.error)
```

A better solution is still to use `Promise.all`:
```javascript
// Better
async function main() {
  // Create an array of 10 promises
  const promises = Array(10).fill(0).map((_, i) => {
    return doWork(i)
  })

  // Resolve all the promises
  const values = await Promise.all(promises)
  console.log(values)
}
main().catch(console.error)
```

The disadvantage is, if one of the `doWork` method throws an error, the whole operation will end with an error.

## Parallel vs Series Operation

```javascript
async function hello() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello')
        }, 2000)
    })
}

async function parallel () {
    const a = hello()
    const b = hello()
    return await a + await b
}
async function parallel2 () {
    const all = await Promise.all([hello(), hello()])
    return all
}

async function series () {
    const a = await hello()
    const b = await hello()
    return a + b
}
console.time('ParallelTimer')
parallel().then((result) => {
    console.log(result)
    console.timeEnd('ParallelTimer')
})

console.time('Parallel2Timer')
parallel2().then((result) => {
    console.log(result)
    console.timeEnd('Parallel2Timer')
})

console.time('SeriesTimer')
series().then((result) => {
    console.log(result)
    console.timeEnd('SeriesTimer')
})
```

## Error handling

To capture the error, use `try/catch/finally`:

```javascript
function workWithError() {
  return Promise.reject(new Error('Oops!'))
}

async function main() {
  try {
    const value = await workWithError()
    console.log(value)
  } catch (error) {
    console.log('mainError:', error.message)
  } finally {
    console.log('finally done')
  }
}

main().catch(console.error)
```

## Handling concurrent error

There are two different approaches when handling errors when running multiple concurrent processes:

1. Stop the operation if one of them has an error
2. Discard the faulty operation (log them too), and take only the ones that succeeds

Take a look a the following example:

```javascript
// Function doWork has 20% chance of throwing an error, this can be an example of api that returns error
// due to malformed payloads or internal server error
function doWork (i) {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.2) {
      return reject(new Error('doWorkError: an unexpected error has occured'))
    }
    resolve(i)
  })
}

// This will run 10 doWork process concurrently, and stop if one of them fail
async function stopOperationIfFail () {
  const promises = Array(10).fill(0).map((_, i) => {
    return doWork(i)
  })
  const values = await Promise.all(promises)
  console.log(values)
}

// This will run 10 doWork process concurrently, and will return null if it fails
async function discardOperationThatFails () {
  const promises = Array(10).fill(0).map((_, i) => {
    return doWork(i).catch((error) => {
      console.log(error.message)
      return null
    })
  })
  const values = await Promise.all(promises)
  console.log(values)

  // Part of our values contains null, we have to filter it now
  const successfulValues = values.filter(nonNull => nonNull !== null)
  // Why we do not do this? Try to uncomment this line to find out
  // const successfulValues = values.filter(nonNull => nonNull)
  console.log(successfulValues)
}

stopOperationIfFail().catch(console.error)
discardOperationThatFails().catch(console.error)
```

## Better concurrent error handling

In the previous example, we show how to `fail silently` when running concurrent processes by just logging the errors. But in production, you might want to do more than just logging the error. Ask yourself if the following is a concern:

- the number of requests and response should match (if I fire 100 endpoints, 100 should be successful)
- if we encounter failure, what is the threshold of the errors allowed? (if 100 is the threshold, the program should be terminated once it reaches the threshold)
- what can we do with the errors? (log it for forensic, or store it elsewhere so that we can perform recovery)

```javascript
// This will run 10 doWork process concurrently, and will return null if it fails
async function returnMixResponses () {
  const promises = Array(10).fill(0).map((_, i) => {
    return doWork(i).catch((error) => {
      console.log(error.message)
      // Return the error object, if you need more details, you can return it as a json, but indicate
      // that it is an error. e.g { error: true, message: error.message }
      return error
    })
  })
  const values = await Promise.all(promises)
  console.log(values)

  // Filter errors 
  const errors = values.filter(e => e instanceof Error)
  const ERROR_THRESHOLD = 100
  if (errors.length > ERROR_THRESHOLD) {
    // Terminate program
  } else {
    // Log the errors
  }
  
  // Filter successful values
  const successfulValues = values.filter(e => !(e instanceof Error))
  
  // Do something with successful values
  console.log(successfulValues)
}
```
