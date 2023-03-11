const pool = require('../config/dtabase');
const bcrypt = require('bcrypt');
// const minioClient = require('../config/minio');


// Register user
const createuser = (req, res) => {
    const { username, email, password, deaf } = req.body
    //check if email already exists
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if  (results.rows.length > 0) {
            res.status(400).json({message: 'Email already exists'})
        } else {
            // Hash the password
            bcrypt.hash(password, 10, function(err, hash) {
            //insert user
            pool.query('INSERT INTO users (username, email, password, deaf) VALUES ($1, $2, $3, $4)', [username, email, hash, deaf], (error, results) => {
                if (error) throw error;
                res.status(201).json({message: 'User created successfully', data: req.body})
            });
        });
        }
    });
};


// Sign Up user contributor
// const createusercontributor = (req, res) => {
//     const { username, email, password, deaf } = req.body
//     // Insert user contributor
//     pool.query('INSERT INTO users (username, email, password, deaf) VALUES ($1, $2, $3, $4)', [username, email, password, deaf], (error, results) => {
//         if (error) throw error;
//         res.status(201).json({message: 'User created successfully'})
//     });
// };


// Login User
const loginuser = (req, res) => {
    const { email, password } = req.body
    //check if email already exists
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length > 0) {
            // Check if password is correct
            bcrypt.compare(password, results.rows[0].password, function(err, result) {
                if (result) {
                    res.status(200).json({message: 'Login successful', data: req.body})
                } else {
                    res.status(400).json({message: 'Incorrect password'})
                }
            });
        } else {
            res.status(400).json({message: 'Email does not exist'})
        }
    });
};

// // Login user contributor
// const loginusercontributor = (req, res) => {
//     const { email, password } = req.body
//     //check if email already exists


// ver 1
const getuser = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) throw error;
            res.status(200).json({message: 'Users successfully', data: results.rows})
   });
 };

// const getuser = (req, res) => {
//     pool.query('SELECT * FROM users', (error, results) => {
//         if (error) {
//             res.json({"status": 400, reason: error.code});
//         } else {
//             res.json({"status": 200, "message": "user succesfully", data: results.rows})
//         }
       
//     });
// };


//ver 1
// const getuserbyid = (req, res) => {
//     const id = parseInt(req.params.id)
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows)
//     });
// };

// const getuserbyid = (req, res) => {
//     const id = parseInt(req.params.id)
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             res.json({"status": 400, reason: error.code});
//         } else {
//             res.json({"status": 200, "message": "user succesfully", data: results.rows})
//         }
       
//     });
// };


//Edit user
const edituser = (req, res) => {
    const id = parseInt(req.params.id)
    const { username, email, password, deaf } = req.body

    bcrypt.hash(password, 10, function(err, hash) {
        //update user
        pool.query('UPDATE users SET username = $1, email = $2, password = $3, deaf = $4 WHERE id = $5', [username, email, hash, deaf, id], (error, results) => {
            if (error) throw error;
            res.status(200).json({message: 'User updated successfully', data: req.body})
        });
    });
};


// User Contributor
// call data from 2 table

//ver 1
// const getusercontributor = (req, res) => {
//     pool.query('SELECT users.username, user_contributor.word FROM users INNER JOIN user_contributor ON users.id = id_usercontri', (error, results) => {
//         if (error) {
//             res.json({"status": 400, reason: error.code});
//         } else {
//             res.json({"status": 200, "message": "user sukses", data: results.rows})
//         }    
//     });
// };


const getusercontributor = (req, res) => {
    pool.query('SELECT users.username, user_contributor.word, user_contributor.video_name FROM users INNER JOIN user_contributor ON users.id = id_usercontri', (error, results) => {
        if (error) {
            res.json({"status": 400, reason: error.code});
        } else {
            res.json({"status": 200, "message": "user sukses", data: results.rows})
        }    
    });
};


const uploadvideo = (req, res) => {
    const {video_name, word, video} = req.body
    pool.query('INSERT INTO user_contributor (video_name, word, video) VALUES ($1, $2, $3)', [ video_name, word, video], (error, results) => {
        if (error) throw error;
        res.status(201).json({message: 'Video uploaded successfully', data: req.body})
    }); 
};


    
// Upload video / update video berdasarkan id
const updatevideo = (req, res) => {
    const { video_name } = req.body
    const id = parseInt(req.params.id)
    pool.query('UPDATE user_contributor SET video_name = $1 WHERE id_usercontri = $2', [video_name, id], (error, results) => {
        if (error) throw error;
        res.status(200).json({message: 'Video updated successfully', data: req.body})
    });
};

// List Ranking user
const linkrank = (req, res) => {
    pool.query('SELECT users.username, user_contributor.word, user_contributor.video_name FROM users INNER JOIN user_contributor ON users.id = id_usercontri', (error, results) => {
        if (error) {
            res.json({"status": 400, reason: error.code});
        } else {
            res.json({"status": 200, "message": "user sukses", data: results.rows})
        }
    });
};



module.exports = {
    loginuser,
    createuser,
    getuser,
    // getuserbyid,
    edituser,
    getusercontributor,
    uploadvideo,
    updatevideo,
    linkrank,
};
