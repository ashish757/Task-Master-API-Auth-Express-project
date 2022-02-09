const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader && !authHeader.startsWith('Bearer ')) {
       return res.json({msg: "no auth token provided"})
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.json({msg: "no auth token provided"})
    }
    try {
        const decoded = jwt.verify(token, "askjfh39%E48ty@derjWP398RY")
        req.user = decoded
        
    } catch (error) {
        return res.json({msg: "Invalid Token"})
    }

    next()
}

module.exports = auth