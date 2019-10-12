import test from 'ava'
//import  {MongoDBServer}  from 'mongomem'
const MongoDBServer = require("mongomem").MongoDBServer
require("chai").should()
const pokemon = require("../pokemon")

test.before("Start MongoDB Server",async t =>{
	await MongoDBServer.start()
	const dburl = await MongoDBServer.getConnectionString()
	pokemon.setDBUrl(dburl)
	await pokemon.save("Eevee", "Normal")
	await pokemon.save("Mew", "Psychic")
})

test('insert pokemon should return true',async t => {
	let res = await pokemon.save("Test Name","Test type")
	t.true(true)
})

test('Get all pokemon should return array',async t => {
	let res = await pokemon.getAll()
	t.true(Array.isArray(res))
	let p = res[0]
	p.should.have.property("name")
	p.should.have.property("_id")
})

test('Get pokemon by id should return object',async t => {
	let res = await pokemon.getAll()
	let p = res[res.length-1]
	let res2 = await pokemon.get(p._id.toString())
	t.true(res2 instanceof Object)
	res2.should.have.property("name")
	res2.should.have.property("_id")
})

test('Update pokemon by id should return true',async t => {
	let res = await pokemon.getAll()
	let p = res[res.length-1]
	p.type2 = "Test Type2"
	let res2 = await pokemon.update(p)
	t.true(res2)
})

test('Delete pokemon by id should return true',async t => {
	let res = await pokemon.getAll()
	let oldN = res.length
	let p = res[res.length-1]
	let res2 = await pokemon.deletePoke(p._id.toString())
	t.true(res2)
})