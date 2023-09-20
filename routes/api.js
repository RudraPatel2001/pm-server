const express = require('express')
const app = express()

const Apis = require("../models/apis")

// Fetch FreeAPIs
app.get("/freeapis", (_, res) => {
    Apis.find()
        .then(r => res.json(r))
        .catch(e => res.json(e))
})

// Specific user -> all apis
app.get("/userapis/:id", (req, res) => {
    const userid = req.params.id

    Apis.find({ apiuserid: userid })
        .then(r => res.json({ rows: r, count: r.length }))
        .catch(e => res.json(e))
})

// Post a FreeAPI
app.post("/postapi", (req, res) => {
    const { apiname, apides, apilive, apidcmt, apiuser, apiuserid } = req.body

    const PostApi = new Apis({
        apiname, apides, apilive, apidcmt, apiuser, apiuserid
    })

    PostApi.save()
        .then(r => res.json({ r: r, msg: "API Added!" }))
        .catch(e => res.json({ msg: e.message }))
})

// Delete single Api
app.delete('/deleteuserapi/:id', (req, res) => {
    const id = req.params.id
    Apis.deleteOne({ _id: id })
        .then(r => res.json({ msg: 'Api deleted!' }))
        .catch(e => res.json({ msg: e.message }))
})

module.exports = app