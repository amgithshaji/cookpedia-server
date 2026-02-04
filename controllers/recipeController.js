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

// view recipe
exports.viewRecipesController = async (req,res)=>{
    console.log("inside viewRecipesController");
    const {id} = req.params
    try {
        const viewRecipe = await recipes.findById({_id:id})
        res.status(200).json(viewRecipe)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
}

// related recipe
exports.relatedRecipesController = async (req,res)=>{
    console.log("inside relatedRecipesController");
    const cuisine = req.query.cuisine
    try {
        const allRecipes = await recipes.find({cuisine})
        res.status(200).json(allRecipes)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
}

// add recipe
exports.addRecipeController = async (req,res)=>{
    console.log("inside addRecipeController");
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body

    try {
        const existingRecipe = await recipes.findOne({name})
        if (existingRecipe) {
            res.status(409).json("recipe already in collection")
            
        } else {
            const newRecipe = await recipes.create({name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
            
            })
            res.status(200).json(newRecipe)
            
        }
       
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
}

// delete recipe 
exports.removeRecipesController = async (req,res)=>{
    console.log("inside removeRecipesController");
    const {id} = req.params
    try {
        const removeRecipe = await recipes.findByIdAndDelete({_id:id})
        res.status(200).json("recipe removed from collection")
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
}

// edit recipe 
exports.editRecipesController = async (req,res)=>{
    console.log("inside editRecipesController");
    const {id} = req.params
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body
    
    try {
        const updateRecipe = await recipes.findByIdAndUpdate({_id:id},{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType},{new:true})
        res.status(200).json(updateRecipe)
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
}