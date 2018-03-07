const app = require('aero')()
const payload = require('./payload.json')

// Cannot set it under the root path
app.get('/hello', (req, res) => {
  // res.json({
    // message: 'hello world'
  // })
  res.json(payload)
})

app.run().then(() => {
  console.log(`server online`)
})
