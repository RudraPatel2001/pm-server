require("dotenv").config()
const express = require("express")
const session = require("express-session")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const app = express()

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}))
app.use(cors({ origin: ["https://promanager5.netlify.app"], credentials: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./routes/user')
const projectRoutes = require('./routes/project')
const apiRoutes = require('./routes/api')

const uri = process.env.ATLAS_URI
const PORT = process.env.PORT || 5000

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Success!"))
    .catch(e => console.log(e.message))

app.get('/', (_, res) => {
    res.json({ api: "working successfully!" })
})
app.use('/u', userRoutes)
app.use('/p', projectRoutes)
app.use('/a', apiRoutes)

app.listen(PORT, () => console.log("Running on " + PORT))