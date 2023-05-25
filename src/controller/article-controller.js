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
