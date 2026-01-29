const feedbacks = require('../models/feedbackModel')


// add feedback
exports.addFeedbackController = async (req,res)=>{
    console.log("inside addFeedbackController");
  
    const {name,email,message} = req.body
    try {

        // add to model
        const newFeedback = await feedbacks.create({
            name,email,message
        })
        res.status(200).json(newFeedback)
      
        
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
    
}

// get approve feedback

exports.getApproveFeedbackController = async (req,res)=>{
    console.log("inside getApproveFeedbackController");
  
    try {

        // add to model
        const approveFeedbacks = await feedbacks.find({
         status:{$eq:"approve"}
        })
        res.status(200).json(approveFeedbacks)
      
        
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
    
}
