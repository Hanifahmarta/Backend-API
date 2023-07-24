const pool = require('../config/dtabase');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mailer = require('nodemailer');
const otpGenerator = require('otp-generator');



//Regiter user contributor 
const usercontributor = (req, res) => {
    const data = { 
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        nomorhp: req.body.nomorhp,
        token: crypto.randomBytes(20).toString('hex'),
        otpCode: otpGenerator.generate(4, { digits: true, alphabets: true, upperCase: false, specialChars: false })
    }
    //check if email already exists
    pool.query('SELECT * FROM usercontributor WHERE email = $1', [data.email], (error, results) => {
        if  (results.rows.length > 0) {
            res.status(409).json({message: 'Email already exists'})
        } else {
            // Hash the password
            bcrypt.hash(data.password, 10, function(err, hash) {
            //insert user
            pool.query('INSERT INTO usercontributor (username, email, password, nomorhp, token, kodeotp) VALUES ($1, $2, $3, $4, $5, $6)', [data.username, data.email, hash, data.nomorhp, data.token, data.otpCode], (error, results) => {
                // pool.query('INSERT INTO usercontributor (username, email, password, nomorhp, token) VALUES ($1, $2, $3, $4, $5)', [data.username, data.email, hash, data.nomorhp, data.token], (error, results) => { 
                if (error) throw error;
                // Send email to user
                const smtpProtocol = mailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "apptribi@gmail.com",
                        pass: "cshqgilkharzxovz"
                    }
                });        
                const mailOption = {
                    from: "apptribi@gmail.com",
                    to: data.email,
                    subject: "Account Verification",
                    text: `Your verification code is: ${data.otpCode}`
                    // text: `Your verification code is: ${otpCode}`
                };
                smtpProtocol.sendMail(mailOption, function(err, response){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Verification email sent to: ' + data.email);
                    }
                    smtpProtocol.close();
                });
                res.status(201).json({message: 'User created successfully', data: req.body, otpCode: data.otpCode})
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
                        token: results.rows[0].token,
                        otpCode: results.rows[0].kodeotp
                    }
                    res.status(200).json({message: 'Login successful', data: req.session.user})
                } else {
                    res.status(400).json({message: 'Incorrect password'})
                }
            });
        } else {
            res.status(404).json({message: 'User not found '})
        }
    });
}

// User Authentication using token from user login
const userauth = (req, res) => {
    // Check if user is authenticated
    if (req.session.user && req.session.user.token === req.body.token) {
        // User is authenticated
        res.status(200).json({ message: 'User authenticated', user: req.session.user });
    }
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
        pool.query('UPDATE usercontributor SET username = $1, email = $2, password = $3, nohp = $4, photo = $5  WHERE id = $6', [username, email, hash, nohp, photo, id], (error, results) => {
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
}

// Upload photo
const updatephoto = (req, res) => {
    pool.query('UPDATE usercontributor SET photo = $1 WHERE id = $2', [req.body.photo, req.session.user], (error, results) => {
        if (error) throw error;
        res.status(201).json({message: 'Photo uploaded successfully', data: results.rows })
    });
}

//upload video
const updatevideo = (req, res) => {
    pool.query('UPDATE usercontributor SET video = $1 WHERE id = $2', [req.body.video, req.session.user], (error, results) => {
        if (error) throw error;
        res.status(201).json({message: 'video uploaded successfully', data: results.rows })
    });
}

module.exports = {
    usercontributor,
    loginusercontributor,
    checkuser,
    userauth,
    editusercontributor,
    getusercontributor,
    signoutcontributor,
    deleteusercontributor,
    checksignout,
    updatephoto,
    updatevideo
}
