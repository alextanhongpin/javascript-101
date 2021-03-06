# Print false assertion

```bash
> console.assert(false, 'hello')
  Assertion failed: hello
undefined
> console.assert(true, 'hello')
undefined
```

## Print table

```bash
> console.table({a: 1, b: 2})
  ┌─────────┬────────┐
  │ (index) │ Values │
  ├─────────┼────────┤
  │    a    │   1    │
  │    b    │   2    │
  └─────────┴────────┘
undefined
> console.table([{a: 1, b: 2}, {a: 3, b:5}])
  ┌─────────┬────────────────┐
  │ (index) │     Values     │
  ├─────────┼────────────────┤
  │    0    │ { a: 1, b: 2 } │
  │    1    │ { a: 3, b: 5 } │
  └─────────┴────────────────┘
undefined
> console.table({a: [1,2], b: [2,3]})
  ┌─────────┬───┬───┐
  │ (index) │ 0 │ 1 │
  ├─────────┼───┼───┤
  │    a    │ 1 │ 2 │
  │    b    │ 2 │ 3 │
  └─────────┴───┴───┘
```

## Grouping Console
Adds indentation to grouped console. Especially useful when you have recursive function.
```bash
> console.group('hello')
hello
undefined
> console.log('hi')
  hi
undefined
> console.groupEnd('hello')
> console.log('hi')
hi
```

## Logging function name

Could be useful for logging.

```js
// Note that printing this.name in a function will not work
> function apple() {console.log(apple.name)}
undefined
> apple()
apple
```
