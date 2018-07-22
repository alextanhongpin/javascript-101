# Fast a-z array
```js
let alphabets = [...'abcdefghijklmnopqrstuvwxyz']
```

# Fast 0-n numbers
```js
Array.from(Array.fill(10).keys())
```

# Different Array.fill behaviour

```javascript
> Array(10).fill(1)
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
> Array(10).fill(1,0)
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
> Array(10).fill(1,0,2)
[ 1, 1, <8 empty items> ]
> Array(10).fill(1,0,10)
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
> Array(10).fill(1,0,4)
[ 1, 1, 1, 1, <6 empty items> ]
> Array(10).fill(1,1,4)
[ <1 empty item>, 1, 1, 1, <6 empty items> ]
> Array(10).fill(1,2,4)
[ <2 empty items>, 1, 1, <6 empty items> ]
> Array(10).fill(0,2,4)
[ <2 empty items>, 0, 0, <6 empty items> ]
> Array(10).fill(0,1,4)
[ <1 empty item>, 0, 0, 0, <6 empty items> ]
> Array(10).fill(0,0,4)
[ 0, 0, 0, 0, <6 empty items> ]
```
# Quick join
```js
let arr = [1, 2, 'a', '1a']
console.log(arr.toString())
// '1,2,a,1a'

// Compared to this
arr.join(',')
```
