const {body, validationResult} = require('express-validator')
const Item = require('../models/itemModel')
const Brand = require('../models/brandModel')
const Category = require('../models/categoryModel')

exports.brands = async(req,res,next) => {
    try{
        const allBrands = await Brand.find({},'name').sort({name:1}).exec()
        res.status(200).json({brands:allBrands})
    }catch(err){
        res.status(403).json({err})
    }
}