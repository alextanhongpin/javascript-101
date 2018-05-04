## Divide and Conquer

Find the maximum item in an array, given that there is only one peak in this given array.

```javascript
function main () {
  const arr = [-5, 1, 2, 3, 6, 10, 2]
  console.log(climb(arr))
}

function climb (arr) {
  const len = arr.length
  if (len === 1) {
    return arr[0]
  }
  const middleIndex = Math.round(arr.length / 2)
  const middleValue = arr[middleIndex]
  const leftValue = arr[middleIndex - 1]
  const rightValue = arr[middleIndex + 1]

  if (middleValue > leftValue && middleValue > rightValue) {
    return middleValue
  }
  if (middleValue > leftValue) {
    return climb(arr.slice(middleIndex, len))
  }
  return climb(arr.slice(0, middleIndex))
}

main()
```

Output:

```bash
10
```

## Knapsack

```javascript
// const values = [60, 100, 120]
const weights = [10, 20, 30]
const maxWeightage = 50
// SOLUTION: 220

const state = {
  10: 60,
  20: 100,
  30: 120
}

function knapsack (state, count = 0) {
// For each weight, we just need to add it to existing keys
  return weights.reduce((state, weight) => {
    const key = weight
    const value = state[weight]
    return Object.keys(state).reduce((_state, _key) => {
      const _value = _state[Number(_key)]
      const newKey = key + Number(_key)
      const newValue = value + _value
      if (!_state[newKey]) {
        if (newKey <= maxWeightage) {
          _state[newKey] = newValue
        }
      }
      return _state
    }, state)
  }, state)
}

const result = knapsack(state)
const maxWeight = Math.max(...Object.keys(result))
console.log(`weight = ${maxWeight} value = ${result[maxWeight]}`)

```