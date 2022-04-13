const prepareValidate = (validate: any) => validate.filter((validator: any) => {
    if(!validator || !validator.type) {
        return false
    }

    return true;
})

export default prepareValidate;
