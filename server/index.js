// dotenv
require("dotenv").config();

// cors
const cors = require("cors");

// terminal styling
const colors = require("colors");

// express
const express = require("express");

// express graphql
const { graphqlHTTP } = require("express-graphql");

// schema
const schema = require("./schema/schema");

// connected mongoDb
const connectDB = require("./config/db");
// decode and verify jwt
const { expressjwt } = require("express-jwt");

const port = process.env.PORT || 5000;

const app = express();

const Auth = require("./api/v0/auth/auth");
const ENCODING_ALGORITHM = require("./config/jwt");

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://organise.vercel.app"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());
app.get("/", function (req, res) {
  res.send("App working fine");
});
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [ENCODING_ALGORITHM],
    credentialsRequired: false,
  }),
);
app.use(function (err, req, res, next) {
    if (err?.inner?.expiredAt) {
        return res.status(401).json({
            message: "expired token",
        });
    }
    if (!req?.auth?.userId) {
        return res.status(401).json({
            message: "invalid token",
        });
    }  
    // next(err) instead of next, if err isn't passed and theres an err it proceeds
    next(err)
  });
app.use("/auth", Auth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
    rootValue: "test",
  })
);

app.listen(port, console.log(`server running on port ${port}`));
