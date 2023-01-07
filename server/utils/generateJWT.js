var jwt = require('jsonwebtoken');
const ENCODING_ALGORITHM = require('../config/jwt');

const generateJWT = (payload, expiration = "2d") => {
    try {
        const token = jwt.sign(
            payload, process.env.JWT_SECRET, 
            {expiresIn: expiration}, 
            { algorithm: ENCODING_ALGORITHM }
        )
        return token
    } catch (err) {
        throw new Error("Unable to generate token")
    }
}

module.exports = generateJWT