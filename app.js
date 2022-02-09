const taskRoutes = require('./routes/taskRoutes')
const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const authMiddle = require("./middlewares/auth")
const errorHandler = require('./middlewares/errorHandler')

const app = require("express")()


const dbURI = "mongodb+srv://ashish757:<password>@testing.kxnnb.mongodb.net/TaskMaster?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then(result => app.listen(8080))
    .catch(err => console.log(err))


// app.use((req, res, next) => {
//     res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
//     res.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE")
//     res.set("Access-Control-Allow-Headers", "content-type")
//     next()
// })

const corsOptions = {
    origin: "*",
    methods:  "GET,POST,PATCH,DELETE",
    allowedHeaders: 'content-type'
}
app.use(cors(corsOptions))

app.use(express.json())


app.get("/", (req, res) => {
    res.send(`
    <h1>Home</h1>
    <h3>GET /api/login</h3>
    <h3>GET /api/signup</h3>
    <a href="/api/tasks">
        <h3>GET /api/tasks</h3>
    </a>
    <h3>GET /api/task/:id</h3>
    <h3>POST /api/task/create</h3>
    <h3>PATCH /api/task/edit/:id</h3>
    <h3>DELETE /api/task/delete/:id</h3>
    `)
})

app.use('/api', taskRoutes)
app.use('/api', authRoutes)

app.get('/secret', authMiddle, (req, res) => {
    // console.log(req.user); iat and exp
    res.json({msg: `hi, ${req.user.name}`, data: "your secret data"})
})



// app.use(errorHandler)

app.all("*", (req, res) => {
    res.status(404).send("<strong><h1>404</h1></strong>")
})
