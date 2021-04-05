const express = require('express')
const app = express()
const port = 3003
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', async function (req, res){
    console.log(req)
    res.send("From localhost3003")
})

app.listen(port)
