'use strict'

var express = require('express')
var controller = require('../controllers/index')

var api = express.Router()

// NEW TASK
api.post('/tasks', controller.saveTask)
// GET TASKS
api.get('/tasks', controller.getTasks)
// UPDATE TASK
api.put('/task/:id', controller.updateTask)
// UPDATE STATE TASK
api.put('/task-done/:id', controller.updateTaskDone)
// DELETE TASK
api.delete('/task/:id', controller.deleteTask)

module.exports = api
