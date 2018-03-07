const app = require('express')()
const port = process.env.PORT || 3000
const payload = require('./payload.json')

app.get('/', (req, res) => {
  // res.status(200).json({
    // message: 'hello world'
  // })
  res.status(200).json(payload)
})

app.listen(port, () => {
  console.log(`listening to port *:${port}`)
})
