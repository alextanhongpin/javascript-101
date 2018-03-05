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
