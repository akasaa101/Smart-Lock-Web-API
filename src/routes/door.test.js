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
		expect(response.body.door).toBeDefined()
	})
	// TODO => Comment out when request body validation is done
	/* it('POST /customers - With invalid email or phone number on body, response status should return as 400, and response body should contain message.', async () => {
		const customer = {
			name: chance.first(),
			surname: chance.last(),
			phone: chance.phone(),
			email: 'invalid@email',
			password: chance.string({ length: 8, alpha: true, numeric: true, symbols: true }),
		}
		const response = await request.post('/customers').send(customer)
		expect(response.status).toBe(400)
		expect(response.body.status).toEqual('failed')
	}) */
})

/* describe('Get All Doors', () => {
	it('GET /doors - With vanillia request, response status should return as 200, and response body should contain doors', async () => {
		const response = await request.get('/doors')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect({ 'Content-Type': 'application/json' })
		expect(/{"message":".*","status":"success"}/)
	})
})

describe('Get Single Customer', () => {
	it('GET /doors/:doorID - With valid doorID on URL params, response status should return as 200, and response body should contain exact door', async () => {
		const response = await request.get('/doors/626dd510230fe728f740d574')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect({ 'Content-Type': 'application/json' })
		expect(response.body.customer).toBeDefined()
	})
	it('GET /customer/:customer_id - With invalid customer id on URL params, response status should return as 404, and response body should contain notfound message', async () => {
		const response = await request.get('/customers/626dd510230fe728f740d574')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect({ 'Content-Type': 'application/json' })
		expect(response.body.customer).toBeDefined()
	})
})
 */
describe('Update Status For A Door', () => {
	// TODO needed dynamic custumerID for this test working correctly. If not, Its propably be FAIL instead of PASSED
	/* it('DELETE /customer/:customer_id - With valid customer id, response status should return as 200, and response body should contain new version of customer', async () => {
		const response = await request.delete('/customers/626dd572f0fa37dd1c70f403')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect(response.body.message).toEqual('deleted')
		expect({ 'Content-Type': 'application/json' })
	}) */
})
