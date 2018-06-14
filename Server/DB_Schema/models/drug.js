const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    type: String,
    category: String,
    danger_level: Number,
    record_level: Number,
    remarks: [String]
});

module.exports = mongoose.model('Drug', productSchema);