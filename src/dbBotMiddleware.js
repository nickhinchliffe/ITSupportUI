const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  console.log(req)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})