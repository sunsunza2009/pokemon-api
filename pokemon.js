var pokeList = []

class Pokemon{
	constructor(name, type){
		this.id = null
		this.name = name
		this.type = type
		this.type2 = null
	}
}

var mock = function(){
	let p = createPokemon("Eevee", "Normal")
	pokeList.push(p)
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

var checkID = function(id){
	return pokeList[id-1] !== undefined && pokeList[id-1] !== null
}

var save = function(name, type){
	let p = new Pokemon(name, type)
	p.id = genID(pokeList.length)
	pokeList.push(p)
	return true
}

var get = function(id){
	return pokeList[id]
}

var update = function(poke){
	let p = new Pokemon(poke.name, poke.type)
	p.id = poke.id
	p.type2 = poke.type2
	pokeList[poke.id - 1] = p
}

var deletePoke = function(id){
	delete pokemon.pokeList[id]
}
module.exports.checkID = checkID
module.exports.save = save
module.exports.pokeList = pokeList
module.exports.mock = mock
module.exports.get = get
module.exports.update = update
module.exports.deletePoke = deletePoke