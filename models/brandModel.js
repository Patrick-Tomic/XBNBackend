const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
    name:{type:String, required:true}
})

module.exports('Brand', brandSchema)