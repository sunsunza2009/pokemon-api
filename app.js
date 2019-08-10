const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

var pokeList = []

app.get('/', function (req, res) {
	res.send(pokeList)
})

app.get('/pokemons', function (req, res) {
	res.send(pokeList)
})

app.post('/pokemons', function (req, res) {
	pokeList.push({name:req.body.name,type:req.body.type})
	console.log(req.body)
	res.sendStatus(201)
})

app.listen(port, () => console.log(`Pokemon API listening on port ${port}`))