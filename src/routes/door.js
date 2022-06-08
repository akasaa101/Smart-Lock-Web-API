const express = require('express')
const { DoorController } = require('../controllers')

const DoorRouter = express.Router()

DoorRouter.post('/', DoorController.createDoor)
DoorRouter.get('/:doorID', DoorController.getDoor)
DoorRouter.get('/', DoorController.getAllDoors)
DoorRouter.post('/:lock_id/addUser', DoorController.addUser)
DoorRouter.post('/:lock_id/removeUser', DoorController.removeUser)
DoorRouter.post('/un-authorize-user', DoorController.unAuthorize)

module.exports = DoorRouter
