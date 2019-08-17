const express = require('express')
const app = express()

app.use(express.json())

class Pokemon{
	constructor(name, type){
		this.id = null
		this.name = name
		this.type = type
		this.type2 = null
	}
}

var genID = function(num){
	let id = num + 1
	return id
}

var createPokemon = function(name, type){
	let p = new Pokemon(name, type)
	p.id = genID(pokeList.length)
	return p
}

var checkParem = function(param){
	return param === '' || param === null || param === undefined
}

var checkID = function(id){
	return pokeList[id-1] !== undefined && pokeList[id-1] !== null
}


var pokeList = []
let p = createPokemon("Eevee", "Normal")
pokeList.push(p)

app.get('/', function (req, res) {
	res.send({message:"Hello world"})
})

app.get('/pokemons', function (req, res) {
	res.send(pokeList)
})

app.get('/pokemon/:id', function (req, res) {
	if(checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id is required"})		
		return
	}
	if(!checkID(req.params.id)){
		res.status(400).send({error:"Cannot get pokemon: Pokemon not found"})		
		return
	}
	res.send(pokeList[req.params.id-1])
})

app.put('/pokemon/:id', function (req, res) {
	if(checkParem(req.body.type2) || checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id and type2 are required"})		
		return
	}
	if(!checkID(req.params.id)){
		res.status(400).send({error:"Cannot update pokemon: Pokemon not found"})		
		return
	}	
	let p = pokeList[req.params.id-1]
	p.type2 = req.body.type2
	res.status(200).send(p)
})

app.delete('/pokemon/:id', function (req, res) {
	if(checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id is required"})		
		return
	}	
	if(!checkID(req.params.id)){
		res.status(400).send({error:"Cannot delete pokemon: Pokemon not found"})		
		return
	}	
	delete pokeList[req.params.id-1]
	res.sendStatus(204)
})

app.post('/pokemons', function (req, res) {
	if(checkParem(req.body.name) || checkParem(req.body.type)){
		res.status(400).send({error:"Insufficient parameters: name and type are required"})		
		return
	}
	let p = createPokemon(req.body.name, req.body.type)
	pokeList.push(p)
	res.status(201).send(p)
})

module.exports = app