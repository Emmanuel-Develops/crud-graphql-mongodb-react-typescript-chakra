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

const Auth = require("./api/v0/auth/auth")

connectDB()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
}))
app.use(express.json())
app.get('/', function(req, res) {
    res.send('App working fine')
})

app.use('/auth', Auth)

app.use('/graphql', graphqlHTTP({
    schema: schema, 
    graphiql: process.env.NODE_ENV === "development"
}))

app.listen(port, console.log(`server running on port ${port}`))
