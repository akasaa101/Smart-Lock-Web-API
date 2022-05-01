/* eslint-disable no-undef */
const supertest = require('supertest')

const app = require('../app')

const request = supertest(app)

describe('Create Door', () => {
	it('POST /doors - With valid customer body, response status should return as 201, and response body should contain created door.', async () => {
		const door = {
			number: Math.floor(Math.random() * (9999 - 1) + 1),
		}
		const response = await request.post('/doors').send(door)
		expect(response.status).toBe(201)
		expect(response.body.status).toEqual('success')
		expect(response.body.message).toEqual('created')
		expect(response.body.door.id).toBeDefined()
		expect(response.body.door.number).toBeDefined()
	})
})

describe('Get All Doors', () => {
	it('GET /doors - With vanillia request, response status should return as 200, and response body should contain all doors', async () => {
		const response = await request.get('/doors')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect({ 'Content-Type': 'application/json' })
		expect(/{"message":".*","status":"success"}/)
		expect(response.body.doors).toBeDefined()
	})
})

describe('Get Single Door', () => {
	it('GET /doors/:doorID - With valid doorID on URL params, response status should return as 200, and response body should contain exact door', async () => {
		const response = await request.get('/doors/626e8c979ed4db0c6c45118a')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect({ 'Content-Type': 'application/json' })
		expect(response.body.door).toBeDefined()
		expect(response.body.door.id).toBeDefined()
		expect(response.body.door.number).toBeDefined()
		expect(response.body.door.status).toBeDefined()
	})
	it('GET /doors/:doorID - With invalid doorID id on URL params, response status should return as 404, and response body should contain notfound message', async () => {
		const response = await request.get('/doors/626e8c979ed4db0c6c45112a')
		expect(response.status).toBe(404)
		expect(response.body.status).toEqual('failed')
		expect(response.body.message).toEqual('Object can not found')
		expect({ 'Content-Type': 'application/json' })
	})
})
