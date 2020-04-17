const mongoose = require('mongoose');

const CocktailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'moImage.jpeg',
  },
  recipe: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [Object]
  }
});

CocktailSchema.methods.publish = function(){
  this.isPublished = true;
};

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;