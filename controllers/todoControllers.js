const fs = require('fs')

const todos = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`,'utf-8'))

exports.validatePostPutTodoBody = (req, res, next) => {
    const { title, description, due_date, priority, completed } = req.body;
    if (!title || !description || !due_date || !priority || completed === undefined) {
      return res.status(400).json({
        status: 'fail',
        message: 'Incomplete todo data. Please provide title, description, due_date, priority, and completed status.',
      });
    }
    next();
}

exports.validatePatchTodoBody = (req, res, next) => {
    const { title, description, due_date, priority, completed } = req.body;
    if (!title && !description && !due_date && !priority && completed === undefined) {
      return res.status(400).json({
        status: 'fail',
        message: 'No fields provided for update. Please provide at least one field to update the todo.',
      });
    }
    next();
}

exports.getAllTodos = (req,res)=>{
    if(todos.length > 0)
        return res.status(200).json(
            //JSend
        {
            status:'success',
            todos
        })
    else
        res.status(404).send('No Todos Found')
}

exports.getTodo = (req,res) => {
    // string to numeric
    const ID = Number(req.params.id)
    const index = todos.findIndex(el => el.id === ID)
    //el.id - number
    if(index !== -1)
    {
        const todo = todos.find(el => el.id === ID)
        res.status(200).json({
            status:'success',
            todo
        })  
    }
    else 
        // res.sendStatus(404)  
        res.status(400).send('Todo not found')
}

exports.createTodo = (req,res)=>{
    const index = todos.length;
    const newID = todos.length === 0 ? 0 : todos[index - 1].id + 1;
    const newtodo = Object.assign({id:newID},req.body)
    todos.push(newtodo)
    fs.writeFile(`${__dirname}/../db/db.json`,JSON.stringify(todos),(err)=>{
        if(err){
            return res.sendStatus(500)
        }
        res.status(200).json({
            status:'success',
            newtodo
        })
    })
}

exports.updateTodo = (req,res)=>{
    const ID = Number(req.params.id);
    const index = todos.findIndex(todo => todo.id === ID);
    if(index !== -1)
        todos[index] = Object.assign({id:ID},req.body)
    else{
        return res.sendStatus(404)
    }
    fs.writeFile(`${__dirname}/../db/db.json`,JSON.stringify(todos),(err)=>{
        if(err){
            return res.sendStatus(500)
        }
        res.status(200).json({
            status : 'success',
            updatedWrokout : todos[index]
        })
    })    
}

exports.editTodo = (req,res)=>{
    
    const ID = Number(req.params.id)
    const index = todos.findIndex(el => el.id === ID)
    if(index !== -1){
        todos[index] = Object.assign(todos[index],req.body)
        fs.writeFile(`${__dirname}/../db/db.json`,JSON.stringify(todos),(err)=>{
            if(err)
                return res.sendStatus(500)
            res.status(200).json({
                status:'success',
                updatedWrokout : todos[index]
            })
        })
    }
    else
        res.sendStatus(404)
}

exports.deleteTodo = (req,res)=>{
    const ID = Number(req.params.id)
    const index = todos.findIndex(todo => todo.id === ID);
    if(index !== -1)
        todos.splice(index,1)
    else
        return res.sendStatus(404)
    fs.writeFile(`${__dirname}/../db/db.json`,JSON.stringify(todos),(err)=>{
        if(err)
            return res.sendStatus(500)
        else{
            res.status(200).json({
                status:'success',
                message:'todo deleted successfully'
            })
        }
        
    })
}
