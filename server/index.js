// dotenv
require('dotenv').config()

// cors
const cors = require('cors')

// terminal styling
const colors = require('colors')

// express
const express = require('express')

// express graphql
const { graphqlHTTP } = require('express-graphql');

// schema
const schema = require('./schema/schema')

// connected mongoDb
const connectDB = require('./config/db')

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: schema, 
    graphiql: process.env.NODE_ENV === "development"
}))

app.listen(port, console.log(`server running on port ${port}`))
