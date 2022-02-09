const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.methods.createJWT = function () {
    return jwt.sign({email: this.email}, "askjfh39%E48ty@derjWP398RY", {expiresIn: "30d"})
}

const User = mongoose.model("user", userSchema)

module.exports = User