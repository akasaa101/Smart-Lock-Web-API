const express = require('express')
const { CustomerController } = require('../controllers')

const CustomerRouter = express.Router()

CustomerRouter.post('/', CustomerController.createCustomer)
CustomerRouter.get('/', CustomerController.getAllCustomers)

module.exports = CustomerRouter
