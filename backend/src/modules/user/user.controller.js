const userService = require("./user.service");

class UserController {
    createUser = async(req, res, next) => {
        try {
            console.log("Request received in controller:", req.body);
            const data = userService.transformUserCreate(req);

            const result = await userService.registerUser(data);
            res.json({
                message: "User created successfully",
                result: {
                    userName: result.userName,
                    email: result.email,
                    phone: result.phone,
                    _id: result._id
                },
                meta: null
            });
        } catch (exception) {
            console.log("Error in createUser controller:", exception);
            
            // Check if it's a MongoDB duplicate key error (code 11000)
            if (exception.name === 'MongoServerError' && exception.code === 11000) {
                return next({
                    status: 400,
                    message: 'Email already exists',
                    details: { email: 'This email is already registered' }
                });
            }
            
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
