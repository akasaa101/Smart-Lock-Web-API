const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router = require('./routes')
const logger = require('../logger')

dotenv.config()

const { errorLogger, errorResponder } = require('./middleware')

mongoose
	.connect('mongodb+srv://admin:bau-smart-lock-2022@smartlockdatabase.53a3u.mongodb.net/?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		logger.info('Backend Service Mongo DB Connection is Done...')
	})
	.catch((err) => {
		logger.error('An error occurred while connecting to MongoDB : ', err)
	})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ exposedHeaders: 'user_id' }))

app.use('/', router)

// Error handling
// app.use(failSafeHandler);
app.use(errorLogger)
app.use(errorResponder)

module.exports = app
