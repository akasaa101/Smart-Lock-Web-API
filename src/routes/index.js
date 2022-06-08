const express = require('express')
const CustomerRouter = require('./customer')
const DoorRouter = require('./door')
const AdminRouter = require('./admin')
const AuthorizationRouter = require('./authorize')

const router = express.Router()

router.get('/', async (req, res) => {
	res.status(200).json({ status: 'success', message: 'server is alive' })
})

router.use('/customers', CustomerRouter)
router.use('/locks', DoorRouter)
router.use('/admin', AdminRouter)
router.use('/authorization', AuthorizationRouter)

module.exports = router
