const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: String,
    quantity: Number,
    description: String
});

module.exports = mongoose.model('Item', ItemSchema)