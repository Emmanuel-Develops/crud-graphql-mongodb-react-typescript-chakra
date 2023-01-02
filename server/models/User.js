const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    }
    // projectId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Project',
    // }
})


module.exports = mongoose.model('User', UserSchema)
