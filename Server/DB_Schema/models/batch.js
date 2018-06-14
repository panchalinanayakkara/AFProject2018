const mongoose = require('mongoose');

const batchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    drugid: String,
    name: String,
    number: Number,
    type: String,
    content: String,
    cartoons: Number,
    cards: Number,
    quantity: Number,
    man_date: String,
    exp_date: String
});

module.exports = mongoose.model('Batch', batchSchema);