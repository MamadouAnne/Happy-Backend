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

// GET /api/v1/images
router.get('/', function(req, res) {
    models.Image.findAll()
    .then(images => {
      res.json(images)
    })
});


// Create new image
// POST /api/v1/images
router.post('/', upload.array('path', 12),(req, res) => {
    console.log(req.files)
    if (!req.files) {
      res.status(400).json({
        error: 'Please, add an image.'
      })
      return;
    }
    models.Image.create({
      path: req.files[0].path

    })
    .then(data => {
      res.status(201).json(data)
    })
  })

module.exports = router;
