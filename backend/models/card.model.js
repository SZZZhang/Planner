const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    columnId: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    color: { type: String, required: false},
    description: { type: String, required: false },
}, {
    timestamps: true,
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;