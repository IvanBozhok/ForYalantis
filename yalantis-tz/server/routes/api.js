const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Img = require('../modules/img');

const db = "mongodb://admin:admin@ds147974.mlab.com:47974/mybd";
mongoose.Promise = global.Promise;
mongoose.connect(db, { useMongoClient: true }, function(err) {
  if ( err ) {
    console.log('Database error! ' + err);
  }
});

router.get('/images', function(req, res) {
  console.log("Get images list");
  Img.find({})
    .exec(function(err, images) {
      if ( err ) {
        res.send('Error loading images list! ' + err);
      } else {
        res.json(images);
      }
    })
});

router.get('/images/:id', function(req, res) {
  console.log("Get a single img info");
  Img.findById(req.params.id)
    .exec(function(err, image) {
      if ( err ) {
        console.log('Img info loading error! ' + err);
      } else {
        console.log('Img info ' + image);
        res.json(image);
      }
    })
});

router.put('/images/:id', (req, res, next) => {
  Img.updateOne()
    .where('_id').equals(req.params.id)
    .set(req.body) // Validate
    .exec()
    .then(result => {
      if (result.ok && result.n > 0) {
        return res.status(200).json({success: true});
      }
      throw {code: 404, message: 'Not found'};
    })
    .catch(error => res.status(404).json({success: false, error}));
});


module.exports = router;
