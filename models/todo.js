const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    }
})

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;