require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.dbURL, {
    dbName: process.env.dbName,
    autoCreate:true,
    autoIndex:true,
})
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err, "Error connecting to MongoDB");
});
