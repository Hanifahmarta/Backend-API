const pool = require('../config/dtabase');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


//Regiter user contributor token
const usercontributor = (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        nohp: req.body.nohp,
        photo: req.body.photo,
        token: crypto.randomBytes(20).toString('hex'),
    }
    //check if email already exists
    pool.query('SELECT * FROM usercontributor WHERE email = $1', [data.email], (error, results) => {
        if  (results.rows.length > 0) {
            res.status(409).json({message: 'Email already exists'})
        } else {
            // Hash the password
            bcrypt.hash(data.password, 10, function(err, hash) {
            //insert user
            pool.query('INSERT INTO usercontributor (username, email, password, nohp, photo, token) VALUES ($1, $2, $3, $4, $5, $6)', [data.username, data.email, hash, data.nohp, data.photo, data.token], (error, results) => {
                if (error) throw error;
                res.status(201).json({message: 'User created successfully', data: req.data})
            });
        });
        }
    });
}


// Login user contributor
const loginusercontributor = (req, res) => {
    const { email, password } = req.body
    //check if email already exists
    pool.query('SELECT * FROM usercontributor WHERE email = $1', [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length > 0) {
            // Check if password is correct
            bcrypt.compare(password, results.rows[0].password, function(err, result) {
                if (result) {
                    //save user to session
                    req.session.user = {
                        id: results.rows[0].id,
                        username: results.rows[0].username,
                        email: results.rows[0].email,
                        nohp: results.rows[0].nohp,
                        photo: results.rows[0].photo,
                    };
                    req.session.isLoggedIn = true;
                    res.status(200).json({message: 'Login successful', data: req.body})
                } else {
                    res.status(400).json({message: 'Incorrect password'})
                }
            });
        } else {
            res.status(404).json({message: 'User not found '})
        }
    });
}

//Check if the user is logged in with session
const checkuser = (req, res) => {
    if (req.session.user) {
        res.status(200).json({message: 'User logged in', data: req.session.user})
    } else {
        res.status(400).json({message: 'User not logged in'})
    }
}


// Edit user contributor
const editusercontributor = (req, res) => {
    const id = parentInt(req.params.id)
    const { username, email, password, nohp, photo } = req.body

    bcrypt.hash (password, 10, function(err, hash) {
        //update user
        pool.query('UPDATE usercontributor SET username = $1, email = $2, password = $3, nohp = $4, photo = $5  WHERE id = $6', [username, email, hash, photo, nohp, id], (error, results) => {
            if (error) throw error;
            res.status(200).json({message: 'User updated successfully', data: req.body})
        });
    });
}

//Get all user contributor
const getusercontributor = (req, res) => {
    pool.query('SELECT * FROM usercontributor', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}

const signoutcontributor = (req, res) => {
    req.session.destroy();
    res.status(200).json({message: 'Logout successful'})
}

const deleteusercontributor = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM usercontributor WHERE id = $1', [id], (error, results) => {
        if (error) throw error;
        res.status(200).json({message: 'User deleted successfully'})
    });
}

const checksignout = (req, res) => {
    if (req.session.user) {
        res.send('User logged in')
    } else {
        res.send('User already logout')
    }
};

module.exports = {
    usercontributor,
    loginusercontributor,
    editusercontributor,
    getusercontributor,
    signoutcontributor,
    deleteusercontributor,
    checksignout
}
