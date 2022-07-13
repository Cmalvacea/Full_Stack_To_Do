const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const Connect = require('./Database/connection')
const cookieParser = require('cookie-parser')
const {v4: uuid} = require('uuid')
const cors = require('cors')
const User_Route = require('./Services/User')
const Log_Route = require('./Services/Login')
const DB_URI = process.env.DB_URI
const port = process.env.PORT


Connect(DB_URI)


app.set('trust proxy', 1)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser(uuid()))



app.use('/Log_Route', Log_Route)
app.use('/User', User_Route)


app.listen(port, () => {
    console.log(`Listening at ${port}`)
})