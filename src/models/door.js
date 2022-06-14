const mongoose = require('mongoose')

const lockSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	status: { type: String, required: true, default: 'active', enum: ['active', 'passive'] },
	name: { type: String, required: true },
	users: { type: [String], required: true, default: [] },
})

module.exports = mongoose.model('Door', lockSchema)
