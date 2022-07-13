const Task = require('../Database/Schemas/TaskSchema')
const User = require('../Database/Schemas/UserSchema')


async function GetPendingTasks(req, res) {
    const PData = await Task.find({'Codes.Owner': req.cookies.UserID, 'State': 'Pending'})
    if(!PData || PData.length == 0) {
        res.status(404).end('No tasks found')
    } else {
        res.status(201).send(PData)
    }
}

async function GetFinishedTasks(req, res) {
    const FData = await Task.find({'Codes.Owner': req.cookies.UserID, 'State': 'Finished'})
    if(!FData || FData.length == 0) {
        res.status(404).send('No tasks found')
    } else {
        res.status(201).send(FData)
    }
}





async function CreateTask(req, res) {
    const DateBody = req.body.date
    const NewDate = new Date(DateBody)
    const Formated = NewDate.toDateString()
    console.log(Formated)
    const NewTask = await new Task({
        Codes: {
            Task_Code: req.body.code,
            Owner: req.cookies.UserID
        },
        Title: req.body.title,
        Description: req.body.description,
        Importance: req.body.importance,
        Deadline: Formated
    })
    const TaskQuery = await Task.findOne({'Codes.Task_Code': req.body.code})
    if(!TaskQuery) {
        await NewTask.save((err) => {
            if(err) throw err;
        })
        res.status(200).end('Task created succesfully')
    } else {
        res.status(403).end('This task already exists')
    }
}

async function FinishTask(req, res) {
    let Result = await Task.findOne({'Codes.Task_Code': req.body.id, 'Codes.Owner': req.cookies.UserID})
    if(!Result || Result.State == 'Finished') {
        res.status(404).end('Not found')
    } else {
        await Task.updateOne({'Codes.Owner': req.cookies.UserID, 'Codes.Task_Code': req.body.id}, {'State': 'Finished'})
        res.send('Task updated succesfully')
    }
}


async function KillTask(req, res) {
    let KResult = await Task.findOne({'Codes.Task_Code': req.body.id, 'Codes.Owner': req.cookies.UserID})
    if(!KResult) {
        res.status(404).end('This task was already finished')
    } else {
        await Task.deleteOne({'Codes.Task_Code': req.body.id, 'Codes.Owner': req.cookies.UserID})
        res.status(201).end('This task was eliminated succesfully')
    }
}

module.exports = {GetPendingTasks, GetFinishedTasks,CreateTask, FinishTask, KillTask}