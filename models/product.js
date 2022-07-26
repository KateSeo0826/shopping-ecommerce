
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
const proAddSchema = new Schema({

  pName:
  {
    type: String,
    required: true

  },

  pPrice:
  {
    type: String,
    required: true
  },
  pDetails:
  {
    type: String,
    required: true
  },
  pCategory:
  {
    type: String,
    required: true
  },
  quantity:
  {
    type: Number,
    required: true
  },
  proPic:
  {
    type: String,

  },
  bestseller:
  {
    type: String,
  }
});

/*
  For every Schema you create(Create a schema per collection), you must also create a model object. 
  The model will allow you to perform CRUD operations on a given collection!!! 
*/

const proAddModel = mongoose.model('product', proAddSchema);

module.exports = proAddModel;