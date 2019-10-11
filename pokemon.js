const mongoCilent = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

var pokeList = []

const DB_URL = "mongodb+srv://admin:admin@cluster0-vydnj.gcp.mongodb.net/test?retryWrites=true&w=majority"
const DB_Name = "example"
const option = {useNewUrlParser: true,useUnifiedTopology: true}

class Pokemon{
	constructor(name, type){
		this.name = name
		this.type = type
		this.type2 = null
	}
}

var collection, database, client
var connect = async function(){
	if(client != undefined)
		return
	client = await mongoCilent.connect(DB_URL, option).catch((err) => console.error(err))
	database = client.db(DB_Name)
}
var Collection = async function(){
	await connect()
	if(collection == undefined)
		collection = database.collection('pokemons')
	return collection
}

var mock = function(){
	//save("Eevee", "Normal")
	//save("Mew", "Psychic")
}

var genID = function(num){
	let id = num + 1
	return id
}

var createPokemon = function(name, type){
	let p = new Pokemon(name, type)
	//p.id = genID(pokeList.length)
	return p
}

var save = async function(name, type){
	let p = createPokemon(name, type)
	let collection = await Collection()
	try{
		var result = await collection.insertOne(p)
		return true
	}catch(err){
		console.error(err)
		return false
	}finally{
		client.close()
	}
}

var getAll = async function(){
	let collection = await Collection()
	try{
		var result = await collection.find({}).toArray()
		return result
	}catch(err){
		console.error(err)
		return false
	}finally{
		client.close()
	}
}

var get = async function(id){
	let collection = await Collection()
	try{
		var result = await collection.findOne({_id:ObjectID(id)})
		return result
	}catch(err){
		console.error(err)
		return false
	}finally{
		//client.close()
	}
}

var update = async function(poke){
	let collection = await Collection()
	try{
		console.log(poke)
		var result = await collection.updateOne({_id:ObjectID(poke._id)},
			{ $set: { name: poke.name, type: poke.type, type2: poke.type2} })
		return true
	}catch(err){
		console.error(err)
		return false
	}finally{
		client.close()
	}
}

var deletePoke = async function(id){
	let collection = await Collection()
	try{
		var result = await collection.deleteOne({_id:ObjectID(id)})
		return true
	}catch(err){
		console.error(err)
		return false
	}finally{
		client.close()
	}
}

module.exports.save = save
module.exports.pokeList = pokeList
module.exports.mock = mock
module.exports.get = get
module.exports.update = update
module.exports.deletePoke = deletePoke
module.exports.getAll = getAll