# Join

```javascript
const join = (sep = ',', first, ...rest) => {
  if (!rest.length) {
    return first
  }
  return first + sep + join(sep, ...rest)
}
```

# Compare Dictionary


```javascript
const values = ['friend', 'firnede', 'firned', 'deinfr', 'apples']

const strToCounter = (s) => {
  return s.split('').reduce((l, r) => {
    if (!l[r]) {
      l[r] = 0
    }
    l[r] += 1
    return l
  }, {})
}

const compareDict = (dict, target) => {
  const possibleResults = dict.filter(d => d.length === target.length)
  const targetDict = strToCounter(target)
  return possibleResults.filter(res => {
    const dict = strToCounter(res)
    return Object.keys(dict).every((key) => {
      return dict[key] === targetDict[key]
    })
  }) 
}

console.log(compareDict(values, 'friend'))
```

Output:

```
[ 'friend', 'firned', 'deinfr' ]
```