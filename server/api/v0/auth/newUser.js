const User = require("../../../models/User")

const createNewUser = async(firstName, lastName, email, picture) => {
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            picture,
        })
        const user = await newUser.save()
        return user
    } catch (err) {
        return err
    }
}

module.exports = createNewUser