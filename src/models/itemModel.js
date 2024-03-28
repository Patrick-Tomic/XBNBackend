const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    category:{type:Schema.Types.ObjectId, ref:'Category', required:true},
    brand:{type:Schema.Types.ObjectId,ref:'Brand', required:true},
    product:{type:String, required:true},
    flavors:{type:Array },
    stock:{type:Number, required:true},
    summary:{type:String}
})

module.exports = mongoose.model("Item", itemSchema)