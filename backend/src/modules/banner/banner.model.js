const mongoose = require('mongoose');
const { Status } = require('../../config/constant.config');

const bannerSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
        default:null,
        max:100,
        min:2
    },
    desktopImage:{
        type:String,
        required:true
    },
    mobileImage:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:[Status.ACTIVE,Status.INACTIVE],
        default:Status.ACTIVE
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        default:null
    }
    
},
{
        timestamps:true,
        autoIndex:true,
        autoCreate:true
})
const BannerModel = mongoose.model('Banner', bannerSchema)

module.exports = BannerModel;

