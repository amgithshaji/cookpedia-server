const mongoose = require('mongoose')

const connectionString = process.env.DB_URL

mongoose.connect(connectionString).then(res=>{
    console.log("database connected successfully");
    
}).catch(error=>{
    console.log("databse connection failed");
    console.log(error);
    
    
})