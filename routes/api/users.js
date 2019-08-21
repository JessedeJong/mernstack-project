const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model
const User = require('../../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Validation (very basic, subject to change)
    if ( !name || !email || !password) {
        return res.status(400).json({
            msg: "Wrong password or email"
        });
    }

    // Check for users
    User.findOne({ email })
        .then(user => {
            // Check if user exists
            if(user) {
                return res.status(400).json({
                    msg: "User exists"
                });
            }

            // Else create new user
            const newUser = new User ({
                name,
                email,
                password
            });  

            // Create hash & salt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        });
                })
            })
    })
});

module.exports = router;