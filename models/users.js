const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    date: { type: String, required: true },
    gender: { type: String, required: true },
    twitter: { type: String, required: true },
    github: { type: String, required: true }
})

const User = mongoose.model("Users", UserSchema)

module.exports = User