const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    author: String,
    body: String,
    date: Date,
    category: String,
    comments: [
        {
            author: String,
            text: String,
            date: Date,
        }
    ],
});

module.exports = mongoose.model('Post', postSchema);