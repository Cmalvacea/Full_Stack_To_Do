const express = require('express')
const User = require('../Database/Schemas/UserSchema')
const User_Route = express()
const {GetPendingTasks, GetFinishedTasks,CreateTask, KillTask, FinishTask} = require('../Functions/Task_Functions')



User_Route.use(async (req, res, next) => {
    const SessionID = req.cookies.UserID
    const QueryUser = await User.findOne({'UserID': SessionID})
    if(QueryUser && SessionID) {
        next()
    } else {
        res.clearCookie('UserID')
        res.status(404).end('User not found')
    }
})

User_Route.route('/Task')
.put(CreateTask)
.patch(FinishTask)
.delete(KillTask)

User_Route.get('/Pending_Tasks', GetPendingTasks)
User_Route.get('/Finished_Tasks', GetFinishedTasks)

module.exports = User_Route