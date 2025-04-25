const { FileFilterType } = require("../../config/constant.config");
const loginCheck = require("../../middleware/auth.middleware");
const hasPermission = require("../../middleware/rbac.middleware");
const { setPath, uploadFile } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const bannerController = require("./banner.controller");
const { bannerCreateDTO, bannerUpdateDTO } = require("./banner.request");

const router = require("express").Router();


router.route('/')
    .get(loginCheck,hasPermission('admin'),bodyValidator(), setPath('banner'),uploadFile(FileFilterType.IMAGE).fields([
        {name:'desktopImage', maxCount:1},
        {name:'mobileImage', maxCount:1}
    ]),bannerController.index)
    .post(loginCheck,hasPermission('admin'),bodyValidator(bannerCreateDTO),bannerController.create)

router.route('/:id')
    .get(loginCheck,hasPermission('admin'), bannerController.getById)
    .put(loginCheck,hasPermission('admin'),setPath('banner'),uploadFile(FileFilterType.IMAGE).fields([
        {name:'desktopImage', maxCount:1},
        {name:'mobileImage', maxCount:1}
    ]),bodyValidator(bannerUpdateDTO),bannerController.update)
    .delete(loginCheck,hasPermission('admin'),bannerController.delete)

router.get('listForHome', bannerController.listForHome)


module.exports = router;
