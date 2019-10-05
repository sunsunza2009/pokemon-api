const express = require('express')
const pokemon = require('./pokemon')
const router = express.Router()

pokemon.mock()

var checkParem = function(param){
	return param === '' || param === null || param === undefined
}

router.get('/pokemons', (req, res) =>  {
	pokemon.getAll().then((result)=>{
		res.send(result)
	}).catch((err)=>{
		console.log(err)
		res.status(500).send({error:"Get Pokemon Unsuccessful"})
	})
})

router.post('/pokemons', (req, res) => {
	if(checkParem(req.body.name) || checkParem(req.body.type)){
		res.status(400).send({error:"Insufficient parameters: name and type are required"})		
		return
	}
	pokemon.save(req.body.name, req.body.type).then((result)=>{
		res.sendStatus(201)
	}).catch((err)=>{
		res.status(500).send({error:"Insert Pokemon Unsuccessful"})
	})

})

router.get('/pokemon/:id', (req, res) => {
	if(checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id is required"})		
		return
	}
	pokemon.checkID(req.params.id).then((result)=>{
		
	}).catch((err)=>{
		res.status(400).send({error:"Cannot get pokemon: Pokemon not found"})
	})
	pokemon.get(req.params.id).then((result)=>{
		res.send(result)
	}).catch((err)=>{
		res.status(500).send({error:"Get Pokemon Unsuccessful"})
	})
})

router.put('/pokemon/:id', (req, res) => {
	if(checkParem(req.body.type2) || checkParem(req.params.id)){
		res.status(400).send({error:"Insufficient parameters: id and type2 are required"})		
		return
	}
	pokemon.checkID(req.params.id).then((result)=>{
		if(result == false)
		{
			res.status(400).send({error:"Cannot get pokemon: Pokemon not found"})	
			return
		}
	}).catch((err)=>{
		res.status(400).send({error:"Cannot get pokemon: Pokemon not found"})
		return
	})
	pokemon.get(req.params.id).then((result)=>{
		if(req.body.name != undefined)
			result.name = req.body.name
		if(req.body.type != undefined)
			result.type = req.body.type
		if(req.body.type2 != undefined)
			result.type2 = req.body.type2
		pokemon.update(req.params.id,result).then((result)=>{
			res.status(200).send(result)
		}).catch((err)=>{
			console.log(err)
			res.status(500).send({error:"Get Pokemon Unsuccessful"})
		})
	}).catch((err)=>{
		res.status(500).send({error:"Get Pokemon Unsuccessful"})
	})
	
})

router.delete('/pokemon/:id', (req, res) => {
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