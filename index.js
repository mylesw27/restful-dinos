// require packages
const express = require('express')
const fs = require('fs')

// app config
const app = express()
const PORT = 8000
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false }))
app.use(express.static("public"))

app.use("/dinosaurs", require('./controllers/dinosaurs'))
app.use("/prehistoric_creatures", require("./controllers/prehistoric_creatures"))

// routes
// GET / -- index show route for the app
app.get('/', (req,res) => {
    res.render('index.ejs')
})

// listen on a port
app.listen(PORT, () => {
    console.log(`is that RESTful dinos I hear? on port ${PORT} 🦕`)
})