/* eslint-disable no-undef */
const supertest = require('supertest')
const Chance = require('chance')

chance = new Chance()

const app = require('../app')

const request = supertest(app)

describe('Create Customer', () => {
	it('POST /customer - With valid customer body, response status should return as 201, and response body should contain created customer.', async () => {
		const customer = {
			name: chance.first(),
			surname: chance.last(),
			phone: chance.phone(),
			email: chance.email({ domain: 'smartlock-test-user.com' }),
			password: chance.string({ length: 8, alpha: true, numeric: true, symbols: true }),
		}
		const response = await request.post('/customer').send(customer)
		expect(response.status).toBe(201)
		expect(response.body.status).toEqual('success')
		expect(response.body.message).toEqual('created')
		expect(response.body.customer).toBeDefined()
	})
	it('POST /customer - With invalid email or phone number on body, response status should return as 400, and response body should contain message.', async () => {
		const customer = {
			name: chance.first(),
			surname: chance.last(),
			phone: chance.phone(),
			email: 'invalid@email',
			password: chance.string({ length: 8, alpha: true, numeric: true, symbols: true }),
		}
		const response = await request.post('/customer').send(customer)
		expect(response.status).toBe(400)
		expect(response.body.status).toEqual('failed')
		expect(response.body.message).toEqual('badrequest')
	})
})

describe('Get All Customers', () => {
	// TODO
})

describe('Get All Customers', () => {
	// TODO
})

describe('Get Single Customer', () => {
	// TODO
})

describe('Update A Customer', () => {
	// TODO
})

describe('Delete A Customer', () => {
	// TODO
})
