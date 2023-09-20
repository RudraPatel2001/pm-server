const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

app.use(passport.initialize())
app.use(passport.session())
require('../passport')(passport)

const User = require("../models/users")

app.get('/users', (_, res) => {
    User.find({}, { password: 0, __v: 0 })
        .then(r => res.json({
            count: r.length,
            rows: r,
            pages: r.length % 10 == 0 ? r.length / 10 : parseInt(r.length / 10) + 1
        }))
        .catch(e => res.json(e))
})

const capitalize = (value) => {
    return value[0].toUpperCase() + value?.substring(1)
}

app.get('/users/:search', (req, res) => {
    const query = req.params.search
    User.find({ fname: { $regex: capitalize(query) } }, { password: 0, __v: 0 })
        .then(r => res.json({
            count: r.length,
            rows: r,
            pages: r.length % 10 == 0 ? r.length / 10 : parseInt(r.length / 10) + 1
        }))
        .catch(e => res.json(e))
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id
    User.find({ _id: id })
        .then(r => res.json(r))
        .catch(e => res.json(e))
})

// app.post("/login", (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) throw err
//         if (!user) res.json({ msg: 'User doesn\'t exist!' })
//         else {
//             req.logIn(user, (err) => {
//                 if (err) throw err
//                 req.session.user = req.user
//                 res.json({ msg: 'Login Success!', user: user })
//             })
//         }
//     })(req, res, next)
// })

app.post('/login', (req, res) => {
    const { username, password } = req.body
    User.find({ username: username }, async (err, docs) => {
        if (err) throw err
        if (!docs) res.send('Username doesn\'t exists!')
        else {
            const comparePass = await bcrypt.compare(password, docs[0].password)
            if (!comparePass) res.send({ msg: 'Incorrect password!' })
            if (comparePass) {
                const token = jwt.sign({ username: username, id: docs?._id }, process.env.TOKEN_SECRET_KEY)
                res.send({
                    msg: 'Login Success!',
                    token: token,
                    user: docs[0]
                })
            }
        }
    })
})

app.post('/signup', (req, res) => {
    const { fname, lname, username, password, email, bio, date, gender, github, twitter } = req.body

    User.findOne({ username: username }, async (err, doc) => {
        if (err) throw err
        if (doc) res.json({ msg: 'User Already Exists!' })
        if (!doc) {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                fname: fname,
                lname: lname,
                username: username,
                password: hashPassword,
                email: email,
                bio: bio,
                date: date,
                gender: gender,
                github: github,
                twitter: twitter
            })

            const token = jwt.sign({ username: username, id: newUser?._id }, process.env.TOKEN_SECRET_KEY)

            await newUser.save()
                .then(r => res.json({
                    r: r,
                    token: token,
                    msg: "Registration Successful!"
                }))
                .catch(e => res.json(e))
        }
    })
})

// app.get("/user", (req, res) => {
//     const user = req.session.user
//     if (user)
//         res.json({ msg: 'Currently loggedIn!', user: req.session.user })
//     else
//         res.json({ msg: 'Please login!', user: null })
// })

// app.get('/logout', function (req, res) {
//     req.logout(function (err) {
//         if (err) throw err
//         else
//             res.json({ msg: 'Logout successful!' })
//     });
// });

module.exports = app