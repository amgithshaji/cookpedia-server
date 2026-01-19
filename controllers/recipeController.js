const recipes = require('../models/recipeModel')

// get all recipe
exports.getAllRecipesController = async (req,res)=>{
    console.log("inside getAllRecipesController");
    try {
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
        
    }
}