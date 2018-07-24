# Recursive generator
```js
function * factorial (n) {
  if (n <= 0) {
    return 1
  }
  let nn = yield * factorial(n - 1)
  let result = n * nn
  yield result
  return result
}

for (let i of factorial(5)) {
  console.log(i)
}
```

Output:

```
1
2
6
24
120
```
