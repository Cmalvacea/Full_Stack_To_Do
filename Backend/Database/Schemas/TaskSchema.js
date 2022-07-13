const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    Codes: {
        Task_Code: String,
        Owner: String
    },
    Title: String,
    Description: String,
    Importance: Number,
    State: {
        type: String,
        default: 'Pending'
    },
    Deadline: Date
})



const Task = mongoose.model('Task', TaskSchema)

module.exports = Task