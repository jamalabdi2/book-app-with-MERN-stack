const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    datePublished: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true 
    }
});

module.exports = mongoose.model('Book', bookModel);
