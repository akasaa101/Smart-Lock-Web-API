const mongoose = require('mongoose')

const doorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	number: { type: Number, required: true },
	status: { type: String, required: true, default: 'active' },
})

module.exports = mongoose.model('Door', doorSchema)
