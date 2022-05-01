const express = require('express')
const { CustomerController } = require('../controllers')

const CustomerRouter = express.Router()

CustomerRouter.post('/', CustomerController.createCustomer)
CustomerRouter.get('/:customerID', CustomerController.getCustomer)
CustomerRouter.get('/', CustomerController.getAllCustomers)

module.exports = CustomerRouter
