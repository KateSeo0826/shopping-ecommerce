const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This indicates the shape of the documents that will be entering the database
  const proaddCart = new Schema({
   
    pName:
    {
      type:String,
      required:true
    
    },

    pPrice: 
    {
        type: Number,
        required:true
    },
  
    quantity:
    {
        type:Number,
        required:true
    },
    proPic:
    {
      type: String,
   
    }
  
  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */

 const cartModel = mongoose.model('addcart', proaddCart);

 module.exports = cartModel;


















