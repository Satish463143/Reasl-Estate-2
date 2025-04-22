const userService = require("./user.service");

class UserController {
    createUser =async(req, res,next)=> {
        try {
            const data = userService.transformUserCreate(req)

            await userService.registerUser(data);
            res.json({
                message:"User created successfully",
                result:data,
                meta:null
            })
        } catch (exception) {
            console.log(exception)
            next(exception);
            
        }
    }
    index = (req,res,next)=>{
        try {
            
            
        } catch (exception) {
            console.log(exception)
            next(exception);
            
        }
    }
    showById = (req,res,next)=>{
        try {
            
            
        } catch (exception) {
            console.log(exception)
            next(exception);
            
        }
    }
    update = (req,res,next)=>{
        try {
            
            
        } catch (exception) {
            console.log(exception)
            next(exception);
            
        }
    }
    delete = (req,res,next)=>{
        try {
            
            
        } catch (exception) {
            console.log(exception)
            next(exception);
            
        }
    }
}
module.exports = new UserController
