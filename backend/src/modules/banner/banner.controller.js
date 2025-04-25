const { uploadImage } = require("../../config/cloudinary.config");
const { Status } = require("../../config/constant.config");
const { deleteFile } = require("../../utilies/helper");
const bannerService = require("./banner.service");

class BannerController{
    bannerDetails;
    create = async(req,res,next)=>{
        try {
            const data = req.body

            if (req.files.mobileImage) {
                data.mobileImage = await uploadImage('./public/uploads/banner/' + req.files.mobileImage[0].filename);
            }
            if (req.files.desktopImage) {
                data.desktopImage = await uploadImage('./public/uploads/banner/' + req.files.desktopImage[0].filename);
            }
             // Assign the authenticated user's ID
             data.createdBy = req.authUser._id;
             const banner = await bannerService.createBanner(data)
             const allFiles = [
                ...(req.files.mobileImage || []),
                ...(req.files.desktopImage || []),
            ];

            for (const file of allFiles) {
                await deleteFile('./public/uploads/banner/' + file.filename);
            }
            res.json({
                result:banner,
                message:'Banner created successfully',
                meta:null
            })            
            
        } catch (exception) {
            console.log('controller exception', exception)
            next(exception)
            
        }
    }
    index = async(req,res,next)=>{
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            let filter ={}
            if(req.query.search){
                filter.title = { $regex: req.query.search, $options: 'i' };
            }
            const {count, data }= await bannerService.getAllBanner({
                skip:skip,
                limit:limit,
                filter:filter
            })
            res.json({
                result:data,
                message:"Banner fetched ",
                meta:{
                    total:count,
                    currentPage:page,
                    limit:limit
                }
            })
        } catch (exception) {
            console.log('controller exception', exception)
            next(exception)
            
        }
    }
    #validate = async (id) => {
        try {
            if (!id) {
                throw { status: 400, message: "Id is required" }
            }
            this.bannerDetails = await bannerService.getIdbyFilter({
                _id: id
            })

            if (!this.bannerDetails) {
                throw { status: 400, message: "banner doesn't Exit" }
            }
        } catch (exception) {
            throw exception
        }

    }
    getById = async(req,res,next)=>{
        try {
            const id = req.params.id
            await this.#validate(id)
            res.json({
                result: this.bannerDetails,
                message: "Product fetched By Id",
                meta: null
            })
        }
        catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    update = async(req,res,next)=>{
        try {
            const id = req.params.id
            await this.#validate(id)
            const data = req.body
            
            if (req.files.mobileImage) {
                data.mobileImage = await uploadImage('./public/uploads/banner/' + req.files.mobileImage[0].filename);
            }
            if (req.files.desktopImage) {
                data.desktopImage = await uploadImage('./public/uploads/banner/' + req.files.desktopImage[0].filename);
            }
            const response = await bannerService.updateBanner(data, id);
            // Clean up uploaded files
                const allFiles = [
                    ...(req.files?.images || []),
                    ...(req.files?.mainImage || []),
                    ...(req.files?.video || []),
                ];

                for (const file of allFiles) {
                    await deleteFile('./public/uploads/banner/' + file.filename);
                }

            res.json({
                result:response,
                message:"banner updated sucessfully",
                meta:null
            })
            
        } catch (exception) {
            console.log('controller exception', exception)
            next(exception)
            
        }
    }
    delete = async(req,res,next)=>{
        try {
            const id = req.params.id
            await this.#validate(id)
            const response = await bannerService.deleteBanner(id)
            res.json({
                result: response,
                message: "Banner deleted Sucessfuly",
                meta: null
            })
            
        } catch (exception) {
            console.log('controller exception', exception)
            next(exception)
            
        }
    }
    listForHome = async(req,res,next)=>{
        try {
            const list = await bannerService.getAllBanner({
                limit: 6,
                filter: {
                    status: Status.ACTIVE
                }
            })
            res.json({
                result: list,
                message: "Banner fetched successfully",
                meta: null
            })
        } catch (exception) {
            console.log('controller exception', exception)
            next(exception)
            
        }
    }
}
module.exports = new BannerController();
