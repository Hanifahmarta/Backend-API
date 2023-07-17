const { Router } = require('express');
const usercontri =  require('../controller/UserContributor');
const video = require('../controller/Video');
const article = require('../controller/article-controller');
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
const router = Router();

router.post('/signup/contributor', usercontri.usercontributor);
router.post('/signin/contributor', usercontri.loginusercontributor);
router.post('/get/auth', usercontri.userauth);
router.get('/checkuser', usercontri.checkuser);
router.get('/getall/contributor', usercontri.getusercontributor);
router.put('/edit/contributor/:id', usercontri.editusercontributor);
router.get('/signout', usercontri.signoutcontributor);
router.get('/checkout', usercontri.checksignout);
router.delete('/delete/:id', usercontri.deleteusercontributor);
router.post('/upload/profile', upload.single('photo'), uploads);
router.post('/upload/videos', upload.single('video'), uploads);
router.post('/upload/video/name', video.uploadVideo);
router.get('/get/video', video.getVideo);
router.get('/result', video.result);
router.get('/ranking', video.ranking);
router.get('/history/user', video.history);
router.delete('/delete/upload/:id', video.deleteHistory);
router.get('/get/article', article.getArticle);
router.get('/article/:id', article.getArticleById);
router.post('/addfav/:id', article.addArticle);
router.put('/update/photo/:id', usercontri.updatephoto );
router.put('/update/video/:id', usercontri.updatevideo );


module.exports = router;
