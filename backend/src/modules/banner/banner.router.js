const loginCheck = require("../../middleware/auth.middleware");
const hasPermission = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");

const router = require("express").Router();


router.route('/')
    .get(loginCheck,hasPermission('admin'),bodyValidator(), bannerController.getBanners)
    .post(loginCheck,hasPermission('admin'),bodyValidator(),bannerController.createBanner)

router.route('/:id')
    .get(loginCheck,hasPermission('admin'), bannerController.getBannerById)
    .put(loginCheck,hasPermission('admin'),bannerController.updateBanner)
    .delete(loginCheck,hasPermission('admin'),bannerController.deleteBanner)


module.exports = router;
