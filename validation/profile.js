const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle= !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
  //  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
        errors.handle = 'Handle needs to be in b/w 2 nd 4';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Handle field is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills is required';
    }

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website='Not a valid url';
        }
    }

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube='Not a valid url';
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter='Not a valid url';
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram='Not a valid url';
        }
    }




    return {
        errors,
        isValid: isEmpty(errors)
    };
};
