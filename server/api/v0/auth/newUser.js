const User = require("../../../models/User")

const createNewUser = async(firstName, lastName, email) => {
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
        })
        const user = await newUser.save()
        return user
    } catch (err) {
        return err
    }
}

module.exports = createNewUser