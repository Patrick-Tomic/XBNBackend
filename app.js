require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
mongoose.set('strictQuery',false)
const mongoDB = process.env.SESSION_SERVER
mongoose.connect(mongoDB)
const db = mongoose.connection()
db.on('error',console.error.bind(console,'mongo connection error'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(3000,()  => console.log('listening on port 3000'))