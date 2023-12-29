const express = require('express')
const router = express.Router()
const {getAllTodos,getTodo,createTodo,updateTodo,editTodo,deleteTodo,validatePostPutTodoBody,validatePatchTodoBody} = require(`${__dirname}/../controllers/todoControllers.js`)

router.route('/').get(getAllTodos).post(validatePostPutTodoBody, createTodo)

router.route('/:id')
.get(getTodo)
.put(validatePostPutTodoBody, updateTodo)
.patch(validatePatchTodoBody, editTodo)
.delete(deleteTodo)

module.exports = router