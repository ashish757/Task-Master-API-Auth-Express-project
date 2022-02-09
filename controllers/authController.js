const User = require('../models/user')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    const {email, password} = req.body

    if (!email && !password) {
        return res.json({msg: "Name and password are required"})
    }
    const user = await User.findOne({email: email})
    if (!user) {
        return res.json({msg: "This email is not registered"})

    }
    if (user) {
        if (await bcrypt.compare(password, user.password)) {

            const token = user.createJWT()
            res.json({msg: "LoggedIn", token})

        } else {
            res.json({msg: "Wrong password"})
        }
        
    } 
}

const signup = async (req, res) => {
    const {name, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        name, email, password: hashedPassword
    })
    await user.save()
    
    if (user) {
        res.status(200).json({msg: "User created"})

    } else {
        res.status(500).json({msg: "there was a error"})
    }
    // const token = jwt.sign({name, email}, "askjfh39%E48ty@derjWP398RY", {expiresIn: "30d"})
    // res.json({msg: "LoggedIn", token})
}


module.exports = {login, signup}