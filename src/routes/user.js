const express = require('express')
const { UserController } = require('../controllers')

const UserRouter = express.Router()

UserRouter.post('/register', UserController.registerUser)
UserRouter.post('/login', UserController.loginUser)

module.exports = UserRouter
