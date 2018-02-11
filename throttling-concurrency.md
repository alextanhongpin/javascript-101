# Throttling concurrency through recursion

This approach will not work well if the array is huge, due to maximum call stack recursion error. The example below demonstrates mapping max 2 items at a time.

```javascript
async function parallelMap (arr, num, fn) {
  if (!arr.length) return []
  const tail = arr.splice(num)
  const result = await Promise.all(arr.map(fn))
  console.log('partial result:', result)
  return result.concat(await parallelMap(tail, num, fn))
}

async function delay (duration) {
  return new Promise((resolve, reject) => setTimeout((_) => resolve(duration), duration))
}

async function main () {
  console.log(await parallelMap([1, 2, 3, 4, 5], 2, async (i) => {
    // Sleep for 1 second
    await delay(1000)
    return i * i
  }))
}

main().then().catch(console.error)

```
