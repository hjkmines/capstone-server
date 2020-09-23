const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

//Create User Schema
const ProfileSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }, 
    jobTitle: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true 
    }, 
    password: {
        type: String, 
        required: true
    }, 
    date: {
        type: Date, 
        default: Date.now
    }
}); 

module.exports = User = mongoose.model('Profiles', ProfileSchema); 