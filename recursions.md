## Finding storage size through recursion

```javascript
function storageSize (value = 0, i = 0) {
  const sizes = ['kB', 'MB', 'GB', 'TB']
  const newValue = value / 1000
  if (newValue < 1) {
    return `${value}${sizes[i]}`
  }
  return storageSize(newValue, i + 1)
}

console.log(storageSize(1))
console.log(storageSize(100))
console.log(storageSize(1000))
console.log(storageSize(100000))
console.log(storageSize(1000000))

```
