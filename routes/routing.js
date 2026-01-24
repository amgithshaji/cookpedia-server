const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const downloadController = require('../controllers/downloadController')
const jwtMiddleWare = require('../middleware/jwtMiddleware')

const router = new express.Router()

// get all recipes
router.get('/recipes',recipeController.getAllRecipesController)
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// -----------------------Authorized user------------------------
// view recipe
router.get('/recipes/:id',jwtMiddleWare,recipeController.viewRecipesController)
// get related recipe
router.get('/related-recipes',jwtMiddleWare,recipeController.relatedRecipesController)
// addtodownload
router.post('/downloads/:id',jwtMiddleWare,downloadController.addToDownloadController)






module.exports = router