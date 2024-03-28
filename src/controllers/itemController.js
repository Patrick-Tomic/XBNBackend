const {body, validationResult} = require('express-validator')
const User = require('../models/userModel')
const Item = require('../models/itemModel')

exports.items = async(req,res,next) => {
    try{
        const allItems = await Item.find({}, 'product flavors stock summary')
        .sort({product:1, stock:1, summary:1}).populate('flavors').exec()
        res.status(200).json({items:allItems})
    }catch(err){
        console.log(err)
        res.status(403).json({err})
    }
}