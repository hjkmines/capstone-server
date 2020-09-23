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