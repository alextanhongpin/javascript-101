async function delay (duration, msg) {
  return new Promise(resolve => setTimeout(_ => resolve(msg), duration))
}

async function somethingElse (msg) {
  const newMsg = await delay(1000, msg)
  return newMsg
}

async function doWork (msg) {
  return somethingElse(msg)
}

async function main () {
  try {
    console.time('start')
    const promises = Array(10).fill(0).map(async(_, i) => {
      const msg = await doWork(i)
      return msg
    })
    const res = await Promise.all(promises)
    console.log(res)
    console.timeEnd('start')
  } catch (error) {
    console.log(error)
  }
}

main()
