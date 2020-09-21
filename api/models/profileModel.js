let mongoose = require('mongoose'); 
let Schema = mongoose.Schema; 

let ProfileSchema = new Schema({
    firstName: {
        type: String, 
        required: 'Please enter your first name'
    }, 
    lastName: {
        type: String, 
        required: 'Please enter your last name'
    }, 
    jobTitle: {
        type: String, 
        required: 'Please enter your job title'
    }, 
    email: {
        type: String, 
        required: 'Please enter your email'
    }, 
    password: {
        type: String, 
        required: 'Please enter a password'
    }, 
    Created_date: {
        type: Date, 
        default: Date.now
    }
}); 

module.exports = mongoose.model('Profile', ProfileSchema); 