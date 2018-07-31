const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
  "name": String,
  "url": String,
  "tooltips": Array,
});

module.exports = mongoose.model('image', imgSchema, 'images');
