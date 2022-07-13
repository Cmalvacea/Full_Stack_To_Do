const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true,
        unique: true
    },
    Username: String,
    Password: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User