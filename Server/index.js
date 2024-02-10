require("dotenv").config()

const express = require("express")
const router = require("./routes/auth")
const { dbConnection } = require("./Utils/db")
const app = express()

dbConnection()

app.use(express.json())

app.use('/', router)

app.listen(process.env.PORT)



