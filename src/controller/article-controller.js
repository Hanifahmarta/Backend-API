const pool = require('../config/dtabase');
const bcrypt = require('bcrypt');
const session = require('express-session');




// Get Article information
const getArticle = (req, res) => {
    pool.query('SELECT * FROM article', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

// Get Article by id
const getArticleById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM article WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.json({"status": 400, reason: error.message});
        } else {
            res.json({"status": 200, "message": "article succesfully", data: results.rows})
        }
    });
}



// buat isi list data semua yg ada di article. ditable artikel kyk tema judl author dll


// // Add article to user logged in favorite list (done)
// const addArticle = (req, res) => {
//     // if check if user logged in
//     if (req.session.user) {
//         //if user already favorited the artikel, return error
//         pool.query('SELECT * FROM favorite WHERE id_user = $1 AND id_article = $2', [req.session.user.id, req.params.id], (error, results) => {
//             if (error) throw error;
//             if (results.rows.length > 0) {
//                 res.status(400).json({message: 'Article already favorited'});
//             } else {
//                 // If user not favorited the article, add it to the list
//                 pool.query('INSERT INTO favorite (id_user, id_article) VALUES ($1, $2)', [req.session.user.id, req.params.id], (error, results) => {
//                     if (error) throw error;
//                     res.status(201).json({message: 'Article added to your favorite list'});
//                 });
//             }
//         });
//     } else {
//         res.status(401).json({message: 'You are not logged in'});
//     }
// }


// Add article to user logged in favorite list (done and fix)
const addArticle = (req, res) => {
    const userId = req.session.user.id
    const articleId = req.params.id 
    // if check if user logged in
    if (req.session.user) {
        //if user already favorited the artikel, return error
        pool.query('SELECT article.* FROM favorites JOIN article ON favorites.article_id = article.id WHERE favorites.user_id = $1', [userId], (error, results) => {
        // pool.query('SELECT * FROM favorites WHERE user_id = $1, article_id = $2', [userId, articleId], (error, results) => { (error)
            if (error) {
                res.json({"status": 400, reason: error.message});
            } else {
                if (results.rows.length > 0) {
                    res.status(400).json({message: 'Article already favorited', data: results.rows});
                } else {
                    // If user not favorited the article, add it to the list
                    pool.query('INSERT INTO favorites (user_id, article_id) VALUES ($1, $2)', [userId, articleId], (error, results) => {
                        if (error) {
                            res.json({"status": 400, reason: error.code});
                        } else {
                            res.status(201).json({message: 'Article added to your favorite list'});
                        }
                    });
                }
            }
        });
    } else {
        res.status(401).json({message: 'You are not logged in'});
    }
}


   
// Get article favorite list
// const getFavorite = (req, res) => {
//     // check if the user is logged in
//     if (req.session.user) {
//         // Get article favorite list
//         pool.query('SELECT usercontributor.id, favorite.id FROM usercontributor INNER JOIN favorite ON usercontributor.id = favorite.id WHERE usercontributor.id = $1', [req.session.user.id], (error, results) => {
//             if (error) {
//                 res.json({"status": 400, reason: error.message});
//             } else {
//                 res.json({"status": 200, "message": "user sukses", data: results.rows})
//             }    
//         });
//     } else {
//         res.status(401).json({message: 'You are not logged in'});
//     }
// }


const getFavorite = (req, res) => {
    const userId = req.session.user.id
    // check if the user is logged in
    if (req.session.user) {
        // Get article favorite list
        pool.query('SELECT article.* FROM favorites JOIN article ON favorites.article_id = article.id WHERE favorites.user_id = $1', [userId], (error, results) => {
            if (error) {
                res.json({"status": 400, reason: error.message});
            } else {
                res.json({"status": 200, "message": "user sukses", data: results.rows})
            }
        });
    } else {
        res.status(401).json({message: 'You are not logged in'});
    }
}



// // add article to user login use email
// const addArticle = (req, res) => {
//     // Check if email already exists
//     pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], (error, results) => {
//         if (error) throw error;
//         if (results.rows.length > 0) {
//             // If email already exists, return error
//             res.json({message: 'Email already exists'});
//         } else {
//             // Check if user already favorited the article, return error 
//             pool.query('SELECT * FROM favorite WHERE id_user = $1 AND id_article = $2', [req.body.id], (error, results) => {
//                 if (error) throw error;
//                 if (results.rows.length > 0) {
//                     res.json({message: 'Article already favorited'});
//                 } else {
//                     // If user not favorited the article, add it to the list
//                     pool.query('INSERT INTO favorite (id_user, id_article) VALUES ($1, $2)', [ req.body.id], (error, results) => {
//                         if (error) throw error;
//                         res.json({message: 'Article added to your favorite list'});
//                     });
//                 }
//             });
//         }
//     });
// }


// // Get article favorite list
// const getFavorite = (req, res) => {
//     // Check if email already exists
//     pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], (error, results) => {
//         if (error) throw error;
//         if (results.rows.length > 0) {
//             // If email already exists, return error
//             res.json({message: 'Email already exists'});
//         } else {
//             // Get article favorite list
//             pool.query('SELECT id_user id_favorite FROM users INNER JOIN favorite ON id_users = id_favorite WHERE id_favorite = $1', [req.session.user.id], (error, results)  => {
//                 if (error) throw error;
//                 res.status(200).json(results.rows);
//             });
//         }
//     });
// }
 
 

// Remove article from favorite list
const removeFavorite = (req, res) => {
    // Check if user is logged in
    if (req.session.user) {
        // Remove article from favorite list
        pool.query('DELETE FROM favorite WHERE id_user = $1 AND id_article = $2', [req.session.user.id, req.body.id], (error, results) => {
            if (error) throw error;
            res.json({message: 'Article removed from your favorite list'});
        });
    } else {
        res.json({message: 'You are not logged in'});
    }
}

module.exports = {
    getArticle,
    addArticle,
    getArticleById,
    getFavorite,
    removeFavorite
}