var jwt = require('jsonwebtoken');

const generateJWT = (payload, expiration = "2d") => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiration})
        return token
    } catch (err) {
        throw new Error("Unable to generate token")
    }
}

module.exports = generateJWT