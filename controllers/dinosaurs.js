const express = require('express')
const router = express.Router()
const fs = require('fs')

// helper function to read the dino db
const readDinos = () => {
    // use the filesystem to read the dino json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    // parse the raw data from json to js
    const dinoData = JSON.parse(dinosaurs)
    //return the dino data
    return dinoData
}

// GET /dinosaurs -- READ return an array of dinos
 router.get('/', (req, res) => {
    let dinos = readDinos()
    console.log(req.query)

    // if the user has searched, filter the dinos array
    if(req.query.dinoFilter) {
        dinos = dinos.filter(dino =>{
            // compare lower case strings for case insensitivity
            return dino.name.toLowerCase().includes(req.query.dinoFilter.toLowerCase())
        })
    }

    res.render("dinos/index.ejs", {
        // equal to { dinos: dinos } (single value means key and value are the same)
        dinos
    })
})


router.get('/new', (req, res) => {
    res.render('dinos/new.ejs')
})

// POST /dinosaurs -- CREATE a new dino in the db
router.post('/', (req, res) => {
    console.log(req.body)
    const dinos = readDinos()
    // push the dino from the req.body into the array json dinos
    dinos.push(req.body)
    // write the json file to save to disk
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))
    // tell the browser to redirect
    // do another GET request on a specific url
    res.redirect('dinosaurs')
})



// GET /dinosaurs/:id -- READ a single dino @ :id
router.get('/:id', (req,res) => {
    //read the dino json data
    const dinos = readDinos()
    // lookup one dino using the req.params
    const foundDino = dinos[req.params.id]
    // render the details template
    res.render("dinos/details.ejs", {
        dino: foundDino,
        id: req.params.id
    })
})


module.exports = router