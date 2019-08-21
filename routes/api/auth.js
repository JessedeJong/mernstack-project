const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Auth middleware
const auth = require('../../middleware/auth');

//User model
const User = require('../../models/User');

// @route POST api/auth
// @desc Authenticate the user
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Validation (very basic, subject to change)
    if ( !email || !password) {
        return res.status(400).json({
            msg: "Wrong password or email"
        });
    }

    // Check for users
    User.findOne({ email })
        .then(user => {
            // Check if user exists
            if(!user) {
                return res.status(400).json({
                    msg: "User does not exist"
                });
            } 

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    // Throw error if password doesnt match
                    if(!isMatch) {
                        return res.status(400).json({
                            msg: "Invalid email/password"
                        })
                    }

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
    })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;