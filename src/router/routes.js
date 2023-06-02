const { Router } = require('express');
const usercontri =  require('../controller/UserContributor');
const video = require('../controller/Video');
const router = Router();
const uploads = require('../controller/Upload');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './assets/images',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
 });

router.post('/signup/contributor', usercontri.usercontributor);
router.post('/signin/contributor', usercontri.loginusercontributor);
router.get('/checkuser', usercontri.checkuser);
router.get('/getall/contributor', usercontri.getusercontributor);
router.put('/edit/contributor/:id', usercontri.editusercontributor);
router.get('/signout', usercontri.signoutcontributor);
router.get('/checkout', usercontri.checksignout);
router.delete('/delete/:id', usercontri.deleteusercontributor);
router.post('/upload/video', video.uploadVideo);
router.get('/get/video', video.getVideo);
router.get('/result', video.result);
router.get('/ranking', video.ranking);
router.get('/history/user', video.history);
router.delete('/delete/upload/:id', video.deleteHistory);
router.post('/upload/image', upload.single('photo'), uploads);
router.post('/upload/videos', upload.single('video'), uploads);
router.get('/get/article', article.getArticle);
router.get('/article/:id', article.getArticleById);
router.post('/addfav/:id', article.addArticle);
router.get('/getfav', article.getFavorite);
router.delete('/delete/article/:id', article.removeFavorite);


module.exports = router;
