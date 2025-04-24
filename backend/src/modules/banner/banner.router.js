const loginCheck = require("../../middleware/auth.middleware");
const hasPermission = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");

const router = require("express").Router();


router.route('/')
    .get(loginCheck,hasPermission('admin'),bodyValidator(), bannerController.getBanners)
    .post(bannerController.createBanner)

router.route('/:id')
    .get(bannerController.getBannerById)
    .put(bannerController.updateBanner)
    .delete(bannerController.deleteBanner)


module.exports = router;
