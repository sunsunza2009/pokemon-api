const express = require('express')
const pokemonsRouters = require('./router')
const app = express()

app.use(express.json())
app.use(pokemonsRouters)

app.get('/', function (req, res) {
	res.send({message:"Hello world"})
})

module.exports = app