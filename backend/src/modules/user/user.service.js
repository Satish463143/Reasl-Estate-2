const bcrypt = require("bcrypt");
const UserModel = require("./user.model");

class UserService{
    transformUserCreate =(req,res)=>{
        try{
            const data = req.body;
            data.password = bcrypt.hashSync(data.password,10);
            return data;

        }catch(exception){
            throw exception;
        }
       
    }
    registerUser = async(req,res)=>{
        try{
            const data = this.transformUserCreate(req,res);
            const user = await UserModel.create(data);
            return user;
        }catch(exception){
            throw exception;
        }
    }
    
    //get user by database key
    getSingleUserByFilter = async (filter)=>{
        try{
            const userDetails = await UserModel.findOne(filter);
                if(userDetails){
                    return userDetails
                }else{
                    throw {status:404, message:"Credentials do not match"}
                }
        }
        catch(exception){
           throw exception
        }
       
    }
}
module.exports = new UserService();
