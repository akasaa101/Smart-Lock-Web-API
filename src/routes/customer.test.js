/* eslint-disable no-undef */
const supertest = require('supertest')
const Chance = require('chance')

chance = new Chance()

const app = require('../app')

const request = supertest(app)

describe('Create Customer', () => {
	it('POST /customers - With valid customer body, response status should return as 201, and response body should contain created customer.', async () => {
		const customer = {
			name: chance.first(),
			surname: chance.last(),
			phone: chance.phone(),
			email: chance.email({ domain: 'smartlock-test-user.com' }),
			password: chance.string({ length: 8, alpha: true, numeric: true, symbols: true }),
		}
		const response = await request.post('/customers').send(customer)
		expect(response.status).toBe(201)
		expect(response.body.status).toEqual('success')
		expect(response.body.message).toEqual('created')
		expect(response.body.customer).toBeDefined()
	})
	it('POST /customers - With invalid email or phone number on body, response status should return as 400, and response body should contain message.', async () => {
		const customer = {
			name: chance.first(),
			surname: chance.last(),
			phone: chance.phone(),
			email: 'invalid@email',
			password: chance.string({ length: 8, alpha: true, numeric: true, symbols: true }),
		}
		const response = await request.post('/customers').send(customer)
		expect(response.status).toBe(401)
		// expect(response.body.status).toEqual('failed')
		// expect(response.body.customers).toBeDefined()
		// update -> status 400  ....
	})
})

describe('Get All Customers', () => {
	it('GET /customers - With vanillia request, response status should return as 200, and response body should contain customers', async () => {
		const response = await request.get('/customers')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect({ 'Content-Type': 'application/json' })
		expect(/{"message":".*","status":"success"}/)
	})
})

describe('Get Single Customer', () => {
	it('GET /customer/:customer_id - With valid customer id on URL params, response status should return as 200, and response body should contain exact customer', async () => {
		const response = await request.get('/customers/626dd510230fe728f740d574')
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

describe('Update A Customer', () => {
	// TODO
})

describe('Delete A Customer', () => {
	// TODO
})
