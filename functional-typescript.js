// forEach

function forEach<T>(arr: T[], fn: Function) {
  for (let a of arr) {
    fn(a)
  }
}

forEach<number>([1,2,3], console.log)

function forEachObject(obj: object, fn: Function) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      fn(prop, obj[prop])
    }
  }
}

forEachObject({hello: 'world'}, console.log)

// unless

function unless (predicate: boolean, fn: Function) {
  if (!predicate) {
    fn()
  }
}

forEach([1,2,3], (n: number) => {
  unless(n % 2 === 0, () => {
    console.log('unless:', n, 'is odd')
  })
})

// times

function times (times: number, fn: Function) {
  for (let i = 0; i < times; i += 1) {
    fn(i)
  }
}

times(5, (n: number) => {
  console.log('times:', n)
})

// every

function every<T>(arr: T[], fn: Function) {
  for (let a of arr) {
    if (!fn(a)) {
      return false
    } 
  }
  return true
}

console.log('every:', every<number>([1, 2, 3, 4], (n: number) => n < 10))

// some

function some<T>(arr: T[], fn: Function) {
  for (let a of arr) {
    if (fn(a)) {
      return true
    }
  }
  return false
}

console.log('some:', some<string>(['a', 'b', 'cde'], (s: string) => s.length > 2))

// compare

function compare<T>(a: T, b: T): number {
  return a < b 
    ? -1 
    : a > b ? 1 : 0
}

let sorted = [10, 3, 2, 15].sort(compare)
console.log('compare:', sorted)

// sortBy

function sortBy<T>(prop: string) {
  return function compare(a: {[index: string]: T}, b: {[index: string]: T}): number {
    return a[prop] < b[prop]
      ? - 1
      : a[prop] > b[prop] ? 1 : 0
  } 
}
let people = [{name: 'a'}, {name: 'z'}, {name: 'c'}]
console.log('sortBy:', people.sort(sortBy<string>('name')))

// unary function

function unary(fn: any) {
  return fn.length === 1 
    ? fn
    : (arg: any) => fn(arg)
}

console.log(['1', '2', '3'].map(unary(parseInt)))

// once

function once(fn: Function) {
  let done = false
  return function() {
    return done ? undefined : ((done = true), fn(arguments))
  }
}

let logOnce = once(() => console.log('hello'))
logOnce()
logOnce()
logOnce()

// memoize

function memoize(fn: Function) {
  let cache: {[key:string]: any} = {}
  return (key: any) => cache[key.toString()] || (cache[key.toString()] = fn(key))
}

function factorial (n: number): number {
  if (n === 0) {
    return 1
  }
  return n * factorial(n - 1)
}

let memoizedFactorial = memoize(factorial)
console.time('factorial')
memoizedFactorial(100)
console.timeEnd('factorial')

console.time('factorial')
memoizedFactorial(100)
console.timeEnd('factorial')

// map

function map<T>(arr: T[], fn: Function): T[] {
  let results = []
  for (let a of arr) {
    results.push(fn(a))
  }
  return results
}

console.log('map:', map<number>([1,2,3], (n: number) => n * 2))

// filter

function filter<T>(arr: T[], fn: Function): T[] {
  let results = []
  for (let a of arr) {
    fn(a) && results.push(a)
  }
  return results
}

console.log('filter:', filter<number>([1, 2, 3], (n: number) => n > 2))

// concatAll

function concatAll<T>(arr: T[][]): T[] {
  let results: T[] = []
  for (let a of arr) {
    results = [...results, ...a]
  }
  return results
}

console.log('concatAll:', concatAll<number>([[1, 2, 3], [4, 5, 6]]))


// reduce

function reduce<T, S>(arr: T[], fn: Function, initialValue: S): S {
  let accumulator = initialValue
  for (let a of arr) {
    accumulator = fn(accumulator, a)
  }   
  return accumulator
}

console.log('reduce:', reduce<number, number>([1, 2, 3], (acc: number, val: number) => acc + val, 0))

// zip

function zip<T, S>(arr1: T[], arr2: S[]): (T|S)[][] {
  let results = []
   let len = Math.min(arr1.length, arr2.length)
   for (let i = 0; i < len; i += 1) {
    results.push([<T>arr1[i], <S>arr2[i]])
   }
   return results
}

console.log('zip:', zip<number, string>([1, 2, 3], ['a', 'b', 'c']))

// flatZip

function flatZip<T, S, R> (arr1: T[], arr2: S[], fn: Function): R[] {
  let results: R[] = []
  let len = Math.min(arr1.length, arr2.length)
  for (let i = 0; i < len; i += 1) {
   results.push(fn(<T>arr1[i], <S>arr2[i]))
  }
  return results
}

console.log('flatZip:', flatZip<number, number, number>([1,2,3], [4,5,6,7], (a: number, b: number) => a + b))

// curry
// - a process of converting a function with n number of arguments into a nested unary functions

function curry(fn: Function): Function {
  return function curriedFunction(...args: any[]): any {
    if (args.length < fn.length) {
      return function (...rest: any[]) {
        return curriedFunction(...args, ...rest)
      }
    }
    return fn(...args)
  }
}

function multipleBy (x: number, y: number, z: number) {
  return x * y * z
}
console.log('curry:', curry(multipleBy)(1)(2)(3))


const match = curry(function (expr: string, str: string) {
  return str.match(expr)
})

let hasNumber = match(/[0-9]+/)
console.log('hasNumber:', hasNumber('1234abc'), hasNumber('abcdef'))


// partial
function partial(fn: Function, ...partialArgs: any[]): Function {
  let args = partialArgs
  return function (...fullArguments: any[]) {
    let arg = 0
    for (let i = 0; i < args.length && arg < fullArguments.length; i += 1) {
      if (args[i] === undefined) {
        args[i] = fullArguments[arg++]
      }
      return fn(...args)
    }
  }
}

let delayTenMs = partial(setTimeout, undefined, 10)
delayTenMs(() => console.log('partial: do task'))

let multiplePartial = partial(multipleBy, undefined, 2, 10)
console.log('partial:', multiplePartial(10))

// compose

const compose = (a: Function, b: Function): Function => (c: any) => a(b(c))

const count = (arr: any[]): number => arr.length
const split = (str: string) => str.split(' ')
console.log('compose:', compose(count, split)('hello world'))

// multiple compose

const composeN = (...fns: Function[]) => (value: any) => reduce(fns.reverse(), (acc: any, fn: Function) => fn(acc), value)

console.log('composeN:', composeN(count, split)('this is so awesome'))

// pipe

const pipe = (...fns: Function[]) => (value: any) => reduce(fns, (acc: any, fn: Function) => fn(acc), value)

console.log('pipe:', pipe(split, count)('count, then count'))

// functor
// - functor is a plain object (or type class in other languages) that implements the function map that,
// while running over each value in the object to produce a new object

class Container {
  constructor(private value: any) {}
  static of (value: any): Container {
    return new Container(value)
  }
  // functor is an object that implements a map contract
  map(fn: Function): Container {
    return Container.of(fn(this.value))
  }
}

let c = Container.of(10)
console.log('container:', c)

console.log('map:', c.map((n: number) => n * 10))

// Maybe

class Maybe {
  constructor(private value: any) {}
  static of (value: any): Maybe {
    return new Maybe(value)
  }
  isNothing(): boolean {
    return (this.value === null || this.value === undefined)
  }
  map(fn: Function): Maybe {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value))
  }
  join(): Maybe | any {
    return this.isNothing() ? Maybe.of(null) : this.value
  }
  chain(fn: Function): Maybe | any {
    return this.map(fn).join()
  }
}

let m = Maybe.of('hello').map((s: string) => s.toUpperCase())
console.log('maybe:', m.join())
console.log('maybe:', Maybe.of(null).map((s: string) => s.toUpperCase()))

// Either

class Nothing {
  constructor(private value: any) {}
  static of (value: any): Nothing {
    return new Nothing(value)
  }
}

class Some {
  constructor(private value: any) {}
  static of (value: any): Some {
    return new Some(value)
  }
  map(fn: Function): Some {
    return Some.of(fn(this.value))
  }
}

type Either = Nothing | Some;
