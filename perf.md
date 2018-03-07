## Faster increment

```javascript
// Good
count++

// Better
count += 1
```

## Keep-Alive connection


Note that there might be memory leak here based on the post [here](https://github.com/request/request/issues/1637). 

```javascript
function callAPI () {
  return new Promise((resolve, reject) => {
    request('http://localhost:3000/no-limit', {
      // Setting forever true
      forever: true
    }, (error, response, body) => {
      error ? reject(error) : resolve(body)
    })
  })
}

// Testing with 10k requests json hello-world
// with forever true
// benchmark: 3739.762ms

// without
// benchmark: 12530.025ms
```

## Remove console.log

Removing `console.log` improves performance a lot. You can send the logs through Kafka to a decentralized log for example.

## Switch to latest nodejs version

Version 8.3 and above is using a different engine. TODO: Add link to related article.

## Remove babel-transpiler

Transpiling server-side code is unnessary. TODO: Show proof that performance is worse.


## Switch from Express to Aero.js

See the folder `/aero-vs-express`. Benchmark the performance difference. Apparently Express still excel, and can be faster than the native nodejs module. So maintain.

## Switch from request to native http.request with keep-alive

See `/request-client` folder:

Small payload (hello world), 1000 concurrent requests:

```
native: 633.063ms
request: 546.906ms
```

Large payload, 1000 concurrent requests:

```
native: 704.800ms
request: 580.321ms
```

Seems like `request` module is still the clear winner.

## TODO
3. Benchmark the node-onion architecture pattern against a plain one.
