## Faster increment

```javascript
// Good
count++

// Better
count += 1
```

## Keep-alive connection

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
benchmark: 3739.762ms

// without
benchmark: 12530.025ms
```
