const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
    
        console.log(`MONGODB connected: ${conn.connection.host}`.blue.underline.bold)
    }

    catch(err) {
        console.log(`Error: ${err}`.red.underline.bold)
    }
}

module.exports = connectDB