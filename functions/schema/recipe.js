const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

// Middleware to handle any additional logic before saving if needed
// Example: Ensure ingredients are stored in a consistent format
recipeSchema.pre('save', function (next) {
    this.ingredients = this.ingredients.map(ingredient => ingredient.toLowerCase());
    next();
});

module.exports =recipeSchema;
