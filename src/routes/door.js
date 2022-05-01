const express = require('express')
const { DoorController } = require('../controllers')

const DoorRouter = express.Router()

DoorRouter.post('/', DoorController.createDoor)
DoorRouter.get('/:doorID', DoorController.getDoor)
DoorRouter.get('/', DoorController.getAllDoors)
DoorRouter.patch('/:doorID', DoorController.updateDoor)
DoorRouter.delete('/:doorID', DoorController.deleteDoor)

module.exports = DoorRouter
