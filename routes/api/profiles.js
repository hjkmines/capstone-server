const express = require('express'); 
const router = express.Router(); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const keys = require('../../config/keys'); 

//load input validation 
const validateRegisterInput = require('../../validation/register'); 
const validateLoginInput = require('../../validation/login'); 

//load profile model 
const Profile = require('../../models/Profile'); 

// @route POST api/users/register 
// @desc Register user 
// @access Public 
router.post('/register', (req, res) => {

    //check validation 
    if (!isValid) {
        return res.status(400).json(errors); 
    }

    Profile.findOne({ email: req.body.email }).then(profile => {
        if (profile) {
            return res.status(400).json({ email: 'Email already exists' }); 
        } else {
            const newProfile = new Profile({
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                jobTitle: req.body.jobTitle, 
                email: req.body.email, 
                password: req.body.password
            }); 

            //Hash password before saving in database 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newProfile.password, salt, (err, hash) => {
                    if (err) throw err; 
                    newProfile.password = hash; 
                    newProfile
                        .save()
                        .then(profile => res.json(profile))
                        .catch(err => console.log(err)); 
                }); 
            }); 
        }
    }); 

}); 

// @route POST api/users/login
// @desc Login user and return JWT token 
// @access Public 
router.post('/login', (req, res) => {
    //form validation
    const { errors, isValid } = validateLoginInput(req.body); 

    //Check validation 
    if (!isValid) {
        return res.status(400).json(errors); 
    }

    const email = req.body.email; 
    const password = req.body.password; 

    //find user by email 
    Profile.findOne({ email }).then(user => {
        //check if profile exists 
        if (!profile) {
            return res.status(404).json({ emailnotfound: 'Email not found' }); 
        }

        //check password 
        bcrypt.compare(password, profile.password).then(isMatch => {
            if (isMatch) {
                //user matched
                //create JWT Payload 
                const payload = {
                    id: profile.id, 
                    firstName: profile.firstName, 
                    lastName: profile.lastName
                }; 

                //sign token 
                jwt.sign(
                    payload, 
                    keys.secretOrKey, 
                    {
                        expiresIn: 31556926 // 1 year in seconds 
                    }, 
                    (err, token) => {
                        res.json({
                            success: true, 
                            token: 'Bearer ' + token
                        }); 
                    }
                )
            } else {
                return res 
                    .status(400)
                    .json({ passwordincorrect: 'Password incorrect' }); 
            }
        }); 
    }); 
}); 

module.exports = router; 