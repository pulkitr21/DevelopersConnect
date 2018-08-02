const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is Required';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.company = 'Degree field is required';
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.from = 'Field of Study field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
