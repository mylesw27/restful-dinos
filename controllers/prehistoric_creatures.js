const express = require('express')
const router = express.Router()
const fs = require('fs')


const readPrehistoricCreatures = () => {
    const prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json")
    const prehistoricCreatureData = JSON.parse(prehistoricCreatures)
    return prehistoricCreatureData
}

router.get("/", (req,res) => {
    let prehistorics = readPrehistoricCreatures()
    res.render("prehistoric_creatures/index.ejs", {
        // equal to { dinos: dinos } (single value means key and value are the same)
        prehistorics
    })
})

router.get("/new", (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

router.post("/", (req, res) => {
    let prehistorics = readPrehistoricCreatures()
    prehistorics.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistorics))
    res.redirect('/prehistoric_creatures')
})

router.get("/:id", (req,res) => {
    let prehistorics = readPrehistoricCreatures()
    const foundPrehistoric = prehistorics[req.params.id]
    res.render("prehistoric_creatures/details.ejs", {
        prehistoric: foundPrehistoric,
        id: req.params.id
    })
})

module.exports = router