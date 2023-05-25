const pool = require('../config/dtabase');
const multer = require('multer');
const { usercontributor } = require('./UserContributor');



// usercontributor login upload video
const uploadVideo = (req, res) => {
    // Check if user is logged in
    if (req.session.user) {
        // Upload video
        // const { word, video_name, video } = req.body;
        const {video_name, video, word} = req.body;
        const data = { 
            video_name: req.body.video_name,
            video: req.body.video,
            word: req.body.word,
            usercontributor_id: req.session.user.id
        }
        pool.query('INSERT INTO video (video_name, video, word, usercontributor_id) VALUES ($1, $2, $3, $4)', [data.video_name, data.video, data.word, data.usercontributor_id], (error, results) => {
        // pool.query('INSERT INTO user_contributor (word, video_name, video) VALUES ($1, $2, $3)', [word, video_name, video], (error, results) => {
            if (error) throw error;
            res.status(201).json({message: 'Video uploaded successfully', data: req.body})
        }
        );
    } else {
        res.status(401).json({message: 'You are not logged in'});
    }
};

// coutn video from upload video and user login
const result = (req, res) => {
    pool.query('SELECT usercontributor.id, usercontributor.username, COUNT(video.video_id) AS video_count FROM usercontributor LEFT JOIN video ON usercontributor.id = video.usercontributor_id GROUP BY usercontributor.id, usercontributor.username') 
    .then((result) => {
        res.status(200).json(result.rows);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

// Get usercontributor video list
const getVideo = (req, res) => {
    pool.query('SELECT * FROM video', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const ranking = (req, res) => {
    pool.query('SELECT usercontributor.id, usercontributor.username, COUNT(video.video_id) AS video_count FROM usercontributor LEFT JOIN video ON usercontributor.id = video.usercontributor_id GROUP BY usercontributor.id, usercontributor.username ORDER BY video_count DESC;')
    .then((result) => {
        res.status(200).json(result.rows);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};


module.exports = {
    uploadVideo, getVideo, result, ranking
};
