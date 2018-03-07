const port = 4000
const app = require('express')()
const payload = require('../aero-vs-express/payload.json')

app.get('/', (req, res) => {
  // res.status(200).json({
    // message: 'hello world'
  // })
  res.status(200).json(payload)
})

app.listen(port, () => {
  console.log(`listening to port *:${port}. press ctrl+c to cancel`)
})
