const express = require('express')
const CustomerRouter = require('./customer')
const DoorRouter = require('./door')
const AdminRouter = require('./admin')

const router = express.Router()

router.get('/', async (req, res) => {
	res.status(200).json({ status: 'success', message: 'server is alive' })
})

router.use('/customers', CustomerRouter)
router.use('/doors', DoorRouter)
router.use('/admin', AdminRouter)

module.exports = router
