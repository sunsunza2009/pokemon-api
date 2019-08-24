const request = require('supertest')
const chai = require('chai')
const app = require('../app')

chai.should()

describe('Pokemon API', () => {
	describe('GET /', () => {
		it('should return 200 OK with "Hello World"', (done) => {
			request(app).get('/').expect(200).end((err, res) => {
				res.body.should.deep.equal({message:"Hello world"})
				done()
			})
		})
	})
	describe('GET /pokemon/:id', () => {
		it('should return 200 OK with Pokemon Object', (done) => {
			request(app).get('/pokemon/1').expect(200).end((err, res) => {
				res.body.should.to.be.an('object')
				res.body.should.to.have.property('name');
				res.body.should.to.have.property('type');
				done()
			})
		})
		it('should return 400 with Error Message', (done) => {
			request(app).get('/pokemon/9999').expect(400).end((err, res) => {
				res.body.error.should.equal('Cannot get pokemon: Pokemon not found')
				done()
			})
		})
	})
	
	describe('POST /pokemons', () => {
		it('should return 201 with new pokemon', (done) => {
			request(app).post('/pokemons').send({name: 'Charizard',type:"Fire"}).expect(201).end((err, res) => {
				res.body.should.deep.include({name: 'Charizard',type:"Fire"})
				done()
			})
		})
		it('should return 400 when missed requried field', (done) => {
			request(app).post('/pokemons').send({name: 'Charmander'}).expect(400).end((err, res) => {
				res.body.error.should.equal('Insufficient parameters: name and type are required')
				done()
			})
		})
	})
	
	describe('PUT /pokemon/:id', () => {
		it('should return 200 OK with pokemon has type2', (done) => {
			request(app).put('/pokemon/2').send({type2:"Flying"}).expect(200).end((err, res) => {
				res.body.should.deep.include({name: 'Charizard',type:"Fire",type2:"Flying"})
				done()
			})
		})
		it('should return 400 when try to update not existed pokemon', (done) => {
			request(app).put('/pokemon/999').expect(400).end((err, res) => {
				res.body.error.should.equal('Insufficient parameters: id and type2 are required')
				done()
			})
		})
	})
	
	describe('DELETE /pokemon/:id', () => {
		it('should return 204 OK when delete pokemon', (done) => {
			request(app).delete('/pokemon/2').expect(204).end((err, res) => {
				done()
			})
		})
		it('should return 400 when try to update not existed pokemon', (done) => {
			request(app).delete('/pokemon/999').expect(400).end((err, res) => {
				res.body.error.should.equal('Cannot delete pokemon: Pokemon not found')
				done()
			})
		})
	})
})

/*describe('Integration Test', () => {
		it('GET /pokemons should return list of pokemons', (done) => {
			request('http://localhost:3000').get('/pokemons').expect(200).end((err, res) => {
				res.body.should.be.a('array')
				done()
			})
		})
})*/