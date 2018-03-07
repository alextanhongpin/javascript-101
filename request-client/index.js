const request = require('request')
const http = require('http')

function makeNativeRequestFactory () {
  const agent = new http.Agent({
    keepAlive: true
  })

  const options = {
    host: 'localhost',
    port: 4000,
    path: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    agent
  }

  return () => {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let str = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          str += chunk
        })

        res.on('end', () => {
          return resolve(str)
        })
      })
      req.on('error', (err) => {
        return reject(err)
      })

      req.write('')
      req.end()
    })
  }
}

function makeRequest () {
  return new Promise((resolve, reject) => {
    request('http://localhost:4000/', {
      json: true,
      agentOptions: {
        keepAlive: true, maxSockets: 1
      },
      agentClass: http.Agent
    }, (error, response, body) => {
      error ? reject(error) : resolve(body)
    })
  })
}

async function main () {
  console.log('start')
  const makeNativeRequest = makeNativeRequestFactory()

  console.time('native')
  const promises = Array(1000).fill(0).map(() => {
    return makeNativeRequest()
  })
  await Promise.all(promises)
  console.timeEnd('native')

  console.time('request')
  const promises2 = Array(1000).fill(0).map(() => {
    return makeRequest()
  })
  await Promise.all(promises2)
  console.timeEnd('request')
  console.log('end')
}

main().then(console.log).catch(console.error)
