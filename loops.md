# Loops

Here are some tips when performing operations with loop. These are not hard rules - just take it with a grain of salt:

1. Avoid `for` loops, use `map`, `filter`, `forEach` and `reduce`
2. Split your loops - one loop for one operation
3. Don't mutate state in loop
4. More loops are better than one large, complex loop. 


Let's take a deeper look at each of these items with an example. Let's say you have the following objectives:

- You were given an array of 10 numbers
- You need to multiply each numbers by 4
- You only need those multiplied numbers whose value is greater than 20
- You need to find the sum of those numbers

Here's a possible solution using for `loop`:

```javascript
const arr = [10, 2, 33, 4, 15, 1, 9, 0, -1, 22]
let results = []

// First loop
for (let i = 0; i < 10; i++) {
  const n = arr[i] * 4
  if (n > 20) {
    results.push(n)
  }
}
let sum = 0

// Second loop
for (let i = 0; i < results.length; i++) {
  sum += results[i]
}
console.log(sum)
```

It's great, but let's review the code before looking at another alternative.

- In the first loop, we are performing two operations - multiplying the numbers by 4, and selecting numbers greater than 20. Due to simplicity of the problem we have above, it may be trivial. But imagine having a large application and performing multiple operations in a single loop. It's hard to decouple the logic, especially when there are states being mutated.
- In the second loop, we are summing the numbers together. We have a mutable variable and we are simply adding them. Again, this example may seem trivial. But when we have multiple operations mutating a single state, there's no telling how the final state will be like.

Let's see how we can do better:

```javascript
const multiplyFour = n => n * 4
const greaterThan20 = n => n > 20
const computeSum = (a, b) => a + b

const sum = arr.map(multiplyFour)
.filter(greaterThan20)
.reduce(computeSum, 0)

console.log(sum)
```

Notice that there are less overhead when reading the second example. We made use of the `map`, `filter` and `reduce` method
to decouple business logic, and place it in individual functions. 

It is much more mantainable, and it's easier to visualize each steps.

## Map

Map is usually used for `transformation`. When we perform a map on an array, it will loop each item individually, perform an operation and return a new array with the mapped values.

In the above example, we map a function called `multiplyFour` with an array of integers. In plain english, it means we loop through the array of integers, and multiply each of them by four, and return the numbers in a new array. 

Let's see what else we can do with map:

### Data Transformation
```javascript
const input = [1, 2, 3, 4, 5]
const multiplyFour = n => n * 10
const output = arr.map(multiplyFour)
// [ 4, 8, 12, 16, 20 ]
```

```javascript
const input = [a, b, c, 4, 5]
const toCurrency = n => `\$${n.toFixed(2)}`
const output = arr.map(toCurrency)
// [ '$1.00', '$2.00', '$3.00', '$4.00', '$5.00' ]
```

### Creating Promises

```javascript
const ids = [1, 2, 3, 4, 5]
const asyncFetch = (id) => {
  // asyncFetch is an operation that fires a rest api to get an item based on the id
}
const promises = ids.map(asyncFetch)
Promise.all(promises).then((result) => {
  // success
}).catch((err) => {
  // error
})
```

### Extracting fields from object

This is especially useful when you are working with large javascript objects. Select the fields you only want to work with.
```javascript
const input = [{ id: 1, name: 'john' }, { id: 2, name: 'doe' }]
const selectName = o => o.name
const output = input.map(selectName)
// ['john', 'doe']
```

### Don'ts in map

Avoid `if/else`/`filter` in a map operation.
```javascript
const input = [1, 2, 3, 4, 5]
const greaterThan3 = o => o > 3 ? o : null
const output = input.map(greaterThan3)
// [null, null, null, 4, 5]
```

## Filter

Filter is meant to filter out data that satisfies a condition:
```javascript
const input = [1, 2, 3, 4, 5]
const greaterThan3 = o => o > 3
// Wrong, use filter
// const output = input.map(greaterThan3)
const output = input.filter(greaterThan3)
// [4, 5]
```

### Clearing null values

You can use filter to clean out null/undefined values:
```javascript
const input = ',,,2,3,4,'
const skipEmpty = n => n.trim().length
const output = input.split(',').filter(skipEmpty)
// [ '2', '3', '4' ]
```

### Chaining filter

Again, do not perform too many operations in a single filter function. Split it if necessary. In the example below, we first filter only fields with values, then we filter the values that are even:

```javascript
const input = ',,,2,3,4,'
const skipEmpty = n => n.trim().length
const takeEven = n => {
  return parseFloat(n, 10) % 2 === 0
}
const output = input.split(',')
.filter(skipEmpty)
.filter(takeEven)
console.log(output)
```

### Get an object with specific id from collection

This is quite common when dealing with arrays. We want to select a particular item with the id:

```javascript
const people = [{ id: 1, name: 'john' }, { id: 2, name: 'doe' }]
const targetId = 1
const person = people.filter((user) => {
  return user.id === targetId
})
// [ { id: 1, name: 'john' } ]
```

## Reduce

Reduce reduces an array to a single value. 

## Sum
```javascript
const input = [1, 2, 3, 4, 5]
// We want to sum the numbers by adding them to 0
const startingValue = 0
const output = input.reduce((a, b) => a + b, startingValue)
console.log(output)

// 15

// For visualization
// First loop: (0, 1) => 0 + 1, 0)
// Second loop: (1, 2) => 1 + 2, 1)
// Third loop: (3, 3) => 3 + 3, 3)
// Fourth loop: (6, 4) => 6 + 4, 6)
// Final loop: (10, 5) => 10 + 5, 10)
```

### Constructing a new object

```javascript
const keys = ['id', 'name', 'age']
const values = [1, 'john', 10]

const startingValue = {}
const finalObject = keys.reduce((obj, key, index) => {
  obj[key] = values[index]
  return obj
}, startingValue)

console.log(finalObject)
```

## Miscellaneous

```javascript
// Old way of creating an array from 1 to 10
let oneToTen = []
for (let i = 0; o < 10; i++) {
  oneToTen.push(i)
}

// Newer (and faster) way
const oneToTen = Array(10).fill(0).map((_, i) => i)
```
