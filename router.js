const express = require('express')
const pokemon = require('./pokemon')
const router = express.Router()

pokemon.mock()

var checkParem = function(param){
	return param === '' || param === null || param === undefined
}

router.get('/pokemons', function (req, res) {
	res.send(pokemon.pokeList)
})

router.post('/pokemons', function (req, res) {
	if(checkParem(req.body.name) || checkParem(req.body.type)){
		res.status(400).send({error:"Insufficient parameters: name and type are required"})		
		return
	}
	let success = pokemon.save(req.body.name, req.body.type)
	if(success)
		res.status(201).send({name: req.body.name,type:req.body.type})
})

router.get('/pokemon/:id', function (req, res) {
	if(checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id is required"})		
		return
	}
	if(!pokemon.checkID(req.params.id)){
		res.status(400).send({error:"Cannot get pokemon: Pokemon not found"})		
		return
	}
	res.send(pokemon.get(req.params.id-1))
})

router.put('/pokemon/:id', function (req, res) {
	if(checkParem(req.body.type2) || checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id and type2 are required"})		
		return
	}
	if(!pokemon.checkID(req.params.id)){
		res.status(400).send({error:"Cannot update pokemon: Pokemon not found"})		
		return
	}	
	let p = pokemon.get(req.params.id-1)
	p.type2 = req.body.type2
	pokemon.update(p)
	res.status(200).send(p)
})

router.delete('/pokemon/:id', function (req, res) {
	if(checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id is required"})		
		return
	}	
	if(!pokemon.checkID(req.params.id)){
		res.status(400).send({error:"Cannot delete pokemon: Pokemon not found"})		
		return
	}	
	pokemon.deletePoke(req.params.id-1)
	res.sendStatus(204)
})

module.exports = router