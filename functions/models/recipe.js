const mongoose = require('mongoose');
const recipeSchema = require('../schema/recipe'); // Correct path to the recipe schema

// Ensure that recipeSchema is a Mongoose schema instance
if (!(recipeSchema instanceof mongoose.Schema)) {
    throw new Error('recipeSchema is not a valid Mongoose schema');
}

const RecipeModel = mongoose.model('Recipe', recipeSchema); // Create the Mongoose model

module.exports = RecipeModel;