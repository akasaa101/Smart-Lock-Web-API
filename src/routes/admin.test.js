/* eslint-disable no-undef */
const supertest = require('supertest')
const Chance = require('chance')

chance = new Chance()

const app = require('../app')

const request = supertest(app)

describe('Admin Login', () => {
	it('POST /admin/login - With valid credentials, response status should return as 200, and response body should contain token', async () => {
		const body = {
			username: 'admin',
			password: 'password',
		}
		const response = await request.post('/admin/login').send(body)
		expect(response.status).toBe(200)
		expect(response.body.status).toEqual('success')
		expect(response.body.message).toEqual('authenticated')
		expect(response.body.token).toBeDefined()
	})
	it('POST /admin/login - With invalid username, response status should return as 401', async () => {
		const body = {
			username: 'invalid',
			password: 'password',
		}
		const response = await request.post('/admin/login').send(body)
		expect(response.status).toBe(401)
		expect(response.body.status).toEqual('failed')
		expect(response.body.message).toEqual('unauthenticated')
	})
	it('POST /admin/login - With invalid password, response status should return as 401', async () => {
		const body = {
			username: 'admin',
			password: 'invalid',
		}
		const response = await request.post('/admin/login').send(body)
		expect(response.status).toBe(401)
		expect(response.body.status).toEqual('failed')
		expect(response.body.message).toEqual('unauthenticated')
	})
	it('POST /admin/login - With invalid password and username, response status should return as 401', async () => {
		const body = {
			username: 'invalid',
			password: 'invalid',
		}
		const response = await request.post('/admin/login').send(body)
		expect(response.status).toBe(401)
		expect(response.body.status).toEqual('failed')
		expect(response.body.message).toEqual('unauthenticated')
	})
})
