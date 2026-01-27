const { json } = require('express');
const saveRecipes = require('../models/saveRecipeModel')

// add to save recipe
exports.addToSaveRecipeController = async (req,res)=>{
    console.log("iniside addToSaveRecipeController");
    const {id} = req.params
    const userMail = req.payload
    const {name,image} = req.body
    try {
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userMail})
        if (existingRecipe) {
            res.status(409).json("recipe already in the collection")
            
        } else {
            // add to model
            const newRecipe = await saveRecipes.create({
                recipeId:id,name,image,userMail
            })
            res.status(200).json(newRecipe)
            
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
        
    }
    

}
// get all save recipe
exports.getUserSaveRecipeController = async (req,res)=>{
    console.log("inside getUserSaveRecipeController");
    const userMail = req.payload
    try {
        const allRecipes = await saveRecipes.find({userMail})
       
            res.status(200).json(allRecipes)
            
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
        
    }

}

// remove recipe from the  save recipe
exports.removeUserRecipeItemController = async (req,res)=>{
    console.log("inside removeUserRecipeItemController");
    const {id} = req.params
    try {
        const detailRecipe = await saveRecipes.findByIdAndDelete({_id:id})
       
            res.status(200).json(detailRecipe)
            
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
        
    }

}





