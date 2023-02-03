const { Router } = require('express');
const controller = require('../controller/user');

const router = Router();

router.post('/signup', controller.createuser);
router.get('/', controller.getuser);
router.get('/:id', controller.getuserbyid);
router.post('/login', controller.loginuser);
router.put('/edit/:id', controller.edituser);

module.exports = router;