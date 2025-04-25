const BannerModel = require("./banner.model");

class BannerService{
    createBanner = async(data)=>{
        try {
            const banner = await new BannerModel(data).save();
            return banner;
        } catch (exception) {
            console.log('service exception', exception)
            throw exception;
        }
    }
    getAllBanner = async({skip=0,limit=0,filter={}})=>{
        try{
            const count = await BannerModel.countDocuments(filter);
            const data = await BannerModel.find(filter)
                .populate('createdBy',["_id","name","email","role"])
                .sort({_id:"desc"})
                .skip(skip)
                .limit(limit);
            return {count,data};
        }catch(exception){
            console.log('service exception', exception)
            throw exception;
        }

    }
    getIdbyFilter = async (filter) => {
        try {
            const bannerDetails = await BannerModel.findOne(filter)
                .populate("createdBy", ["_id", "email", "name", "role"])
            return bannerDetails

        } catch (exception) {
            throw exception
        }

    }
    updateBanner = async(data,id)=>{
        try{
            const response = await BannerModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            return response

        }catch(exception){
            console.log('update service',exception)
            throw exception
        }
        

    }
    deleteBanner = async (id) => {
        try {
            const response = await BannerModel.findByIdAndDelete(id)
            if (!response) {
                throw { status: 404, message: "banner Not Found" }
            }
            return response
        } catch (exception) {
            throw exception
        }
    }
}

module.exports = new BannerService();
