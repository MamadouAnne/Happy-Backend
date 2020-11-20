const express = require('express');
const router = express.Router();
const models = require('../models')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});

const upload = multer({storage: storage})

/* GET all shelters */
// GET /api/v1/shelters 
router.get('/', function(req, res) {
  models.Shelter.findAll()
    .then(shelters => {
      res.json(shelters)
    })
});

// Get 1 shelter
// GET /api/v1/shelters/102
router.get('/:id', (req, res) => {
    models.Shelter.findByPk(req.params.id, {include: [models.Image]})
      .then(shelter => {
        if (shelter) {
          res.json(shelter)
        } else {
          res.status(404).json({
            error: 'Shelter not found :('
          })
        }
      })
})

// Create new shelter
// POST /api/v1/shelters
router.post('/', upload.array('path', 8), (req, res) => {
  if (!req.body.name || !req.body.latitude || !req.body.longitude || !req.body.about || !req.body.instructions || !req.body.open_hours || !req.body.open_on_weekends) {
    res.status(400).json({
      error: 'Please, submit all required fields.'
    })
    return;
  }
  models.Shelter.create({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    about: req.body.about,
    instructions: req.body.instructions,
    open_hours: req.body.open_hours,
    open_on_weekends: req.body.open_on_weekends,
    Images: req.files.map(file => {
      return {
        path: file.path
      }
    })
  }, {
    include: [models.Image]
  }
  )
  .then(data => {
    res.status(201).json(data)
  })
})

module.exports = router;
