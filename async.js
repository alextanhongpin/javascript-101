async function hello() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello')
        }, 2000)
    })
}

async function parallel () {
    const a = hello()
    const b = hello()
    return await a + await b
}
async function parallel2 () {
    const all = await Promise.all([hello(), hello()])
    return all
}

async function series () {
    const a = await hello()
    const b = await hello()
    return a + b
}
console.time('ParallelTimer')
parallel().then((result) => {
    console.log(result)
    console.timeEnd('ParallelTimer')
})

console.time('Parallel2Timer')
parallel2().then((result) => {
    console.log(result)
    console.timeEnd('Parallel2Timer')
})

console.time('SeriesTimer')
series().then((result) => {
    console.log(result)
    console.timeEnd('SeriesTimer')
})
