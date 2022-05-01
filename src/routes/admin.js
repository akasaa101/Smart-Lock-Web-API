const express = require('express')
const { AdminController } = require('../controllers')

const AdminRouter = express.Router()

AdminRouter.post('/login', AdminController.login)

module.exports = AdminRouter
