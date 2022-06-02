const mongoose = require('mongoose')

const doorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	number: { type: Number, required: true },
	status: { type: String, required: true, default: 'active' },
	name: { type: String, required: true },
	users: { type: Array, required: true },
})

module.exports = mongoose.model('Door', doorSchema)
