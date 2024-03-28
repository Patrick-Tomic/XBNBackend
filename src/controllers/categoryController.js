const {body, validationResult} = require('express-validator')
const User = require('../models/userModel')
const Item = require('../models/itemModel')
const Brand = require('../models/brandModel')
const Category = require('../models/categoryModel')

exports.categories = async(req,res,next) => {
    try{
        const allCateg = await Category.find({}, 'type').sort({type:1}).exec()
        res.status(200).json({categories:allCateg})
    }catch(err){
        res.status(403).json({err})
    }
}