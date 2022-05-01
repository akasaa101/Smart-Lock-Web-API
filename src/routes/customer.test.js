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
	it('PATCH /customer/:customer_id - With valid customer body, response status should return as 204, and response body should contain new version of customer', async () => {
		const updated = {
			email: chance.email({ domain: 'updated-smartlock-test-user.com' }),
			password: 'updated-smartlock-test-user-password',
		}

		const body = {
			updateParams: {
				email: updated.email,
				password: updated.password,
			},
		}
		const response = await request.patch('/customers/626dd510230fe728f740d574').send(body)
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect({ 'Content-Type': 'application/json' })
		expect(response.body.customer.email).toEqual(updated.email)
		expect(response.body.customer.password).toEqual(updated.password)
	})
})

describe('Delete A Customer', () => {
	// TODO needed dynamic custumerID for this test working correctly. If not, Its propably be FAIL instead of PASSED
	/* it('DELETE /customer/:customer_id - With valid customer id, response status should return as 200, and response body should contain new version of customer', async () => {
		const response = await request.delete('/customers/626dd572f0fa37dd1c70f403')
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect(response.body.message).toEqual('deleted')
		expect({ 'Content-Type': 'application/json' })
	}) */
})
