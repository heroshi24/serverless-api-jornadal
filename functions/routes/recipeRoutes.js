const express = require('express');
const RecipeModel = require('../models/recipe');

const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await RecipeModel.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single recipe
router.get('/:id', getRecipe, (req, res) => {
    res.json(res.recipe);
});

// Create a recipe
router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { name, cuisine, ingredients, favorite } = req.body;
        if (!name || !cuisine || !ingredients) {
            return res.status(400).json({ message: 'Name, cuisine, and ingredients are required' });
        }

        // Check if the recipe's name already exists
        const existingRecipe = await RecipeModel.findOne({ name });
        if (existingRecipe) {
            return res.status(400).json({ message: 'Recipe already exists' });
        }

        const recipe = new RecipeModel({ name, cuisine, ingredients, favorite });
        const newRecipe = await recipe.save();
        res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a recipe
router.patch('/:id', getRecipe, async (req, res) => {
    try {
        const { name, cuisine, ingredients, favorite } = req.body;
        if (name != null) res.recipe.name = name;
        if (cuisine != null) res.recipe.cuisine = cuisine;
        if (ingredients != null) res.recipe.ingredients = ingredients;
        if (favorite != null) res.recipe.favorite = favorite;

        const updatedRecipe = await res.recipe.save();
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Replace a recipe
router.put('/:id', getRecipe, async (req, res) => {
    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a recipe
router.delete('/:id', getRecipe, async (req, res) => {
    try {
        await RecipeModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single recipe by ID
async function getRecipe(req, res, next) {
    try {
        const recipe = await RecipeModel.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.recipe = recipe;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;
