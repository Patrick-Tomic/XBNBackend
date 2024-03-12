const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('./models/userModel')
const passportJWT = require('passport-jwt')
const JWTstrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(async(email, password, done) => {
    const user = await User.findOne({email:email})
    if(!user) {
        return done(null, false, {message:'Incorrect Email'})
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return done(null, false, {message:'Passwords do not match'})
    }
    return done(null, user,{message:"logged in"})
}))

passport.use(
    new JWTstrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    },
    async (token, done) => {
        try{
            console.log(token)
            return done(null, token.user)
        }catch(err){
            return done(err)
        }
    })
)