const { Router } = require('express');
const controller = require('../controller/user');

const router = Router();

router.post('/signup', controller.createuser);
router.post('/signin', controller.loginuser);

router.get('/getall', controller.getuser);
// router.get('/:id', controller.getuserbyid);
router.get('/get', controller.getusercontributor);

router.put('/edit/:id', controller.edituser);
router.put('/upload/:id', controller.updatevideo);

router.post('/upload/video', controller.uploadvideo);
module.exports = router;
