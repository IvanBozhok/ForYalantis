const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Img = require('../modules/img');

const db = "mongodb://admin:admin@ds147974.mlab.com:47974/mybd";
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true }, function(err) {
  if ( err ) {
    console.log('Database error! ' + err);
  }
});

//-----------------------------------------------------------------------------
router.post('/images', function(req, res) {
  console.log('req =>>>>', req.body);
  console.log('=>>>>>' + req.body.data);
  console.log('=>>>>>' + req.body.name);
  const newImage = new Img({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    url: req.body.url,
    tooltips: req.body.tooltips,
  });

  newImage.save()
    .then(result => {
      console.log(result);
      result.populate('/')
        .execPopulate()
        .then(result => {
          res.status(200).json({success: true, data: result});
        })
        .catch(error => {
          res.status(500).json({success: false, error});
        });
    })
    .catch(error => {
      res.status(500).json({success: false, error});
    });
});
//-----------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------

router.get('/images/:id', function(req, res) {
  Img.findById(req.params.id)
    .exec(function(err, image) {
      if ( err ) {
        console.log('Img info loading error! ' + err);
      } else {
        res.json(image);
      }
    })
});
//-----------------------------------------------------------------------------

router.put('/images/:id', function(req, res) {
  console.log('=>>>>>' + req.body.data);
  console.log('=>>>>>' + req.body.name);
  console.log('=>>>>>' + req.params.id);
  console.log('=>>>>>' + req.params);
  const upImage = new Img({
    _id: req.params.id,
    name: req.body.name,
    url: req.body.url,
    tooltips: req.body.tooltips,
  });
  console.log('upImage =>>>>>' + upImage);

  upImage.update()
    .where('_id').equals(req.params.id)
    .then(result => {
      console.log(result);
      if (result.ok && result.n > 0) {
        return res.status(200).json({success: true});
      }
      throw {code: 404, message: 'Not found'};
    })
    .catch(error => res.status(404).json({success: false, error}));
});
//-----------------------------------------------------------------------------


module.exports = router;
