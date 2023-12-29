const express = require('express')
const dotenv = require('dotenv')
const todoRouter = require(`${__dirname}/routes/todoRouter.js`)
const app = express()
app.use(express.json())
dotenv.config({ path: './config.env'}); 
app.use('/api/v1/todos',todoRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,'127.0.0.1',()=>{
    console.log('Server Started...')
})
