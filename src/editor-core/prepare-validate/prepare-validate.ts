const prepareValidate = (validate: any) => validate.filter((validator: any) => {
    if(!validator || !validator.type) {
        return false
    }

    if(['min-number-value', 'max-number-value'].includes(validator.type) && typeof validator.value === 'undefined') {
        return false;
    }

    if(['min-length', 'max-length', 'exact-length'].includes(validator.type) && typeof validator.threshold === 'undefined') {
        return false;
    }

    if(['pattern'].includes(validator.type) && typeof validator.pattern === 'undefined') {
        return false;
    }

    return true;
})

export default prepareValidate;
