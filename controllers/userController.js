const jwt = require('jsonwebtoken')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const {body, validation} = require('express-validator')
const User = require("../models/userModel")

exports.login = async(req,res,next) => {
    try{
        passport.authenticate('local', {session:false}, (err,user,info) => {
            if(err || !user){
                const error = new Error('User does not exist')
                return res.status(403).json({info})
            }
            req.login(user,{session:false}, (err) =>{
                if(err) {
                    next(err)
                }
                const body = {_id:user._id, username:user.username, admin:user.admin}
                const token = jwt.sign({userLbody}, process.env.SECRET, {expiresIn:'1d'})
                return res.status(200).json({body,token})
            })
        })(req,res,next)
    }catch(err){
        res.status(403).json({
            error:'no connection'
        })
    }
}

exports.signup = [
    body('first').trim().escape(),
    body('last').trim().escape(),
    body('email').trim().escape(),
    body('password').trim().escape(),
    body('confirm').custom(async(value,{req}) => {
        if(value != req.body.password){
            throw new Error('password does not match confirm portion')
        }
    }).escape(),
    async(req,res,next) => {
        const errors = validationResult(req)
        const attempt = await User.findOne({email:req.body.email})
        if(attempt != undefined || !errors.isEmpty()){
            return res.status(403).json({
                email:req.body.email,
                errors:errors.array(),
                message:'Email already in use'
            })
        }

        const hash = await bcrypt.hash(req.body.password,13)
        const user = new User({
            firstName:req.body.first,
            lastName:req.body.last,
            email:req.body.email,
            password:hash,
            admin:false
        })
        user.save()
        return res.status(200).json('User Created Successfully')
    }
]

exports.logout = (req,res,next) => {
    console.log('logged out')
}