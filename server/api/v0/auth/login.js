const { Router} = require("express");
const User = require("../../../models/User");
const verifyCredentials = require("./verifyToken");
var jwt = require('jsonwebtoken');
const generateJWT = require("../../../utils/generateJWT");
const createNewUser = require("./newUser");

const router = Router()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

router.post("/login", async (req, res) => {
    try {
        const { credential } = req.body

        if (credential) {
            const verificationResponse = await verifyCredentials(credential)
            if (verificationResponse.error) {
                return res.status(400).json({
                    message: verificationResponse.error,
                });
            }
            const payload = verificationResponse.payload
            const isExistingUser = await User.findOne({email: payload?.email})

            const user = isExistingUser ? isExistingUser : await createNewUser(payload?.given_name, payload?.family_name, payload?.email)
            const userId = user._id
    
            const token = generateJWT({email: payload?.email, userId})
        
            res.status(201).json({
                message: (isExistingUser ? "SigIn" : "SignUp") + " was successful",
                user: {
                  userId,
                  firstName: payload?.given_name,
                  lastName: payload?.family_name,
                  picture: payload?.picture,
                  email: payload?.email,
                  token,
                },
              })
        }
    } catch(err){
        res.status(500).json({
            message: "An error occurred. Registration failed.",
            err: err?.error || err
        });
    }
})
const LoginRouter = router

module.exports = LoginRouter

