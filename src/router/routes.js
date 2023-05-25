const { Router } = require('express');
const user = require('../controller/user');
const usercontri =  require('../controller/UserContributor');
const article = require('../controller/article-controller');
const video = require('../controller/Video');

const router = Router();

router.post('/signup/contributor', usercontri.usercontributor);
router.post('/signin/contributor', usercontri.loginusercontributor);
router.get('/getall/contributor', usercontri.getusercontributor);
router.post ('/uplod/profile', usercontri.uploadprofile);
router.get('/signout', usercontri.signoutcontributor);
router.delete('/delete/:id', usercontri.deleteusercontributor);

router.post('/upload/video', video.uploadVideo);
router.get('/get/video', video.getVideo);
router.get('/result', video.result);
router.get('/ranking', video.ranking);

router.get('/get/article', article.getArticle);
router.get('/article/:id', article.getArticleById);
router.post('/addfav/:id', article.addArticle);
router.post('/addfav', article.addArticle);
router.get('/getfav', article.getFavorite);

module.exports = router;
