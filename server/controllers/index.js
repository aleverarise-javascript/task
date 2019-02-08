// USE THIS FOR TOOLS ES6
'use strict'

// USE LOCALSTORAGE FOR NODE
var localStorage = require('localStorage')

// GET TASKS
function getTasks(req, res) {
    if (localStorage.getItem('tasks')) {
        res.status(200).send({
            tasks: JSON.parse(localStorage.getItem('tasks')),
        })
    } else {
        res.status(200).send({
            tasks: [],
        })
    }
}

// SAVE TASK
function saveTask(req, res) {
    var params = req.body

    if (localStorage.getItem('tasks')) {
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.push(params.task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        res.status(200).send({
            message: 'Ready!',
        })
    } else {
        let tasks = []
        tasks.push(params.task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        res.status(200).send({
            message: 'Ready!',
        })
    }
}

// UPDATE TASK
function updateTask(req, res) {
    var params = req.body

    if (localStorage.getItem('tasks')) {
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        if (tasks[req.params.id]) {
            tasks[req.params.id].name = params.name
            localStorage.setItem('tasks', JSON.stringify(tasks))
            res.status(200).send({
                message: 'Ready!',
            })
        } else {
            res.status(400).send({
                message: 'Not Found!',
            })
        }
    } else {
        res.status(400).send({
            message: 'Error Not Found!',
        })
    }
}

// UPDATE STATE FOR TASK
function updateTaskDone(req, res) {
    var params = req.body

    if (localStorage.getItem('tasks')) {
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        if (tasks[req.params.id]) {
            tasks[req.params.id].done = params.done
            localStorage.setItem('tasks', JSON.stringify(tasks))
            res.status(200).send({
                message: 'Ready!',
            })
        } else {
            res.status(400).send({
                message: 'Not Found!',
            })
        }
    } else {
        res.status(400).send({
            message: 'Error Not Found!',
        })
    }
}

// DELETE TASK
function deleteTask(req, res) {
    var params = req.body

    if (localStorage.getItem('tasks')) {
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        if (tasks[req.params.id]) {
            tasks.splice(req.params.id, 1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            res.status(200).send({
                message: 'Ready!',
            })
        } else {
            res.status(400).send({
                message: 'Not Found!',
            })
        }
    } else {
        res.status(400).send({
            message: 'Error Not Found!',
        })
    }
}

// EXPORT FUNCTIONS
module.exports = {
    saveTask,
    getTasks,
    updateTask,
    updateTaskDone,
    deleteTask,
}
