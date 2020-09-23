const Validator = require('validator'); 
const isEmpty = require('is-empty'); 

module.exports = function validateRegisterInput(data) {
    let errors = {}; 

    //convert empty fields to an empty string so we can use validator functions 
    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''; 
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''; 
    data.jobTitle = !isEmpty(data.jobTitle) ? data.jobTitle : ''; 
    data.email = !isEmpty(data.email) ? data.email : ''; 
    data.password = !isEmpty(data.password) ? data.password : ''; 
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''; 

    //Name Check 
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required'; 
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required'; 
    }

    //job title check 
    if (Validator.isEmpty(data.jobTitle)) {
        errors.jobTitle = 'Job Title is required'; 
    }

    //Email check 
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'; 
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'; 
    }

    //password check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'; 
    } 

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters'; 
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match'; 
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }; 
}; 


