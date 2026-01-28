const express = require('express')
const recipeController = require('../controllers/recipeController')
const userController = require('../controllers/userController')
const downloadController = require('../controllers/downloadController')
const jwtMiddleWare = require('../middleware/jwtMiddleware')
const saveController = require('../controllers/saveController')
const feedbackController = require('../controllers/feedbackController')

const router = new express.Router()

// get all recipes
router.get('/recipes',recipeController.getAllRecipesController)
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// add feedback
router.post('/feedback',feedbackController.addFeedbackController)

// -----------------------Authorized user------------------------
// view recipe
router.get('/recipes/:id',jwtMiddleWare,recipeController.viewRecipesController)
// get related recipe
router.get('/related-recipes',jwtMiddleWare,recipeController.relatedRecipesController)
// addtodownload
router.post('/downloads/:id',jwtMiddleWare,downloadController.addToDownloadController)
// add to save
router.post('/recipes/:id/save',jwtMiddleWare,saveController.addToSaveRecipeController)
// get user save recipe
router.get('/recipe-collection',jwtMiddleWare,saveController.getUserSaveRecipeController)
// get remove user save recipe
router.delete('/recipe-collection/:id',jwtMiddleWare,saveController.removeUserRecipeItemController)
// get user save recipe
router.get('/user-downloads',jwtMiddleWare,downloadController.getUesrDownloadListController)









module.exports = router