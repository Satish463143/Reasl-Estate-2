const Joi = require('joi');

const bannerCreateDTO = Joi.object({
    title:Joi.string().required(),
    subTitle:Joi.string().max(100).min(2).optional(),
    desktopImage:Joi.string().required(),
    mobileImage:Joi.string().required(),
    status:Joi.string().valid(Status.ACTIVE,Status.INACTIVE).required()
})
const bannerUpdateDTO = Joi.object({
    title:Joi.string().optional(),
    subTitle:Joi.string().max(100).min(2).optional(),
    desktopImage:Joi.string().optional(),
    mobileImage:Joi.string().optional(),
    status:Joi.string().valid(Status.ACTIVE,Status.INACTIVE).optional()
})

module.exports = {
    bannerCreateDTO,
    bannerUpdateDTO
}
