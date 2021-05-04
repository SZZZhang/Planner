const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const columnSchema = new Schema({
    boardId: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    color: { type: String, required: false},
    cards: { type: [mongoose.ObjectId], required: true, ref: 'Card' }
}, {
    timestamps: true,
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;