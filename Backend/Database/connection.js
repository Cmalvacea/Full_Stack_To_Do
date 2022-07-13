const mongoose = require('mongoose')


async function Connect(url) {
    try {
        mongoose.connect(url)
        console.log('Database conencted')
    } catch (error) {
        console.log('There has been a mistake during the operation')
    }
}

module.exports = Connect