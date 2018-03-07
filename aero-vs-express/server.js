const http = require('http')
const port = 3000
const payload = require('./payload.json')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // res.end(JSON.stringify({
    // message: 'hello world'
  // }))
  res.end(JSON.stringify(payload))
})

console.log(`listening to port *:${port}`)
server.listen(port)
