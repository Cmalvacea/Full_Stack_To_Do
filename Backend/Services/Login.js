const express = require('express')
const Log_Route = express()
const User = require('../Database/Schemas/UserSchema')
const {customAlphabet} = require('nanoid')
const {v4: uuid} = require('uuid')
const UserIDGEN = customAlphabet('ABCDEFGHIJKLMNÑOPRSTUVQWXYZ', 6)

Log_Route.post('/Sign_In', (req, res) => {
    const UserQuery = {
        Username: req.body.username,
        Password: req.body.password
    }
    User.findOne(UserQuery, (err, data) => {
        if(err) throw err;
        if(!data) {
            res.status(404).end('Username or password incorrect, please try again')
        } else {
            res.status(200).cookie('UserID', data.UserID, {httpOnly: false}).end(data.UserID)
        }
    })
})

Log_Route.post('/Sign_Up', (req, res) => {
    const NewUser = new User({
        UserID: UserIDGEN(),
        Username: req.body.username,
        Password: req.body.password
    })
    User.findOne({'Username': req.body.username}, (err, user) => {
        if(err) throw err;
        if(!user) {
            NewUser.save((err) => {
                if(err) throw err;
                res.cookie('UserID', user.UserID, {httpOnly: false, signed: true, secret: uuid()})
                res.status(200).end('User created succesfully')
            })
        } else {
            res.status(400).end('User already exists')
        }
    })
})

Log_Route.get('/Log_out', (req, res) => {
    res.clearCookie('UserID')
    res.send('Thanks for your visit')
})

module.exports = Log_Route