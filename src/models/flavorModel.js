const mongoose = require('mongoose')
const Schema = mongoose.Schema
const flavor = new Schema({
    flavor:{type:String, required:true}
})

module.exports = mongoose.model('Flavor',flavor)