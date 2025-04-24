const jwt = require('jsonwebtoken');
require('dotenv').config();
const userService = require('../user/user.service');
const bcrypt = require('bcrypt');
const UserModel = require('../user/user.model');

class AuthController {
    login = async(req,res,next)=>{
        try{
            const {email,password} = req.body;
            const user = await userService.getSingleUserByFilter({email:email});

            if(bcrypt.compareSync(password,user.password)){
                const token = jwt.sign({
                    sub:user._id,
                },process.env.JWT_SECRET,
                {expiresIn:'1h'}
            )
                const refreshToken = jwt.sign({
                    sub:user._id,
                    type:'refresh'
                },process.env.JWT_SECRET,{
                    expiresIn:'1d'
                }
            )
                await UserModel.findByIdAndUpdate(user._id,{token:token,refreshToken:refreshToken});
                res.json({
                    result:{
                        userDetails:{
                            _id:user._id,
                            name:user.userName,
                            email:user.email,
                            role:user.role
                        },
                        token:{token, refreshToken}
                    },
                    message:'Login Successfully',
                    meta:null
                })
            }
        }catch(exception){
            console.log('Error in login controller',exception);
            next(exception);
            
        }
    }
    logout =async(req,res,next)=>{
        try{
            const userId = req.user._id;
            await UserModel.findByIdAndUpdate(userId,{token:null,refreshToken:null});
            res.json({
                result:null,
                message:'Logout Successfully',
                meta:null
            })

        }catch(exception){
            console.log('Error in logout controller',exception);
            next(exception);
        }

    }
    me = (req,res,next)=>{
        try{
            const user = req.authUser;
            res.json({
                result:user,
                message:'User details fetched successfully',
                meta:null
            })
        }catch(exception){
            console.log('Error in me controller',exception);
            next(exception);
        }
    }
}
module.exports = new AuthController();