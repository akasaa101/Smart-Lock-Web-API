const express = require('express')
const { AuthorizationController } = require('../controllers')

const AuthorizationRouter = express.Router()

AuthorizationRouter.post('/check', AuthorizationController.checkAuthorization)

module.exports = AuthorizationRouter
