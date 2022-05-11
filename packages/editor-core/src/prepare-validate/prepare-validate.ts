const prepareValidate = (validate: any) => validate.map((validator: any) => {
	const newValidator = validator;

	if(!validator || !validator.type) {
		return undefined;
	}

	if(['min-number-value', 'max-number-value'].includes(validator.type) && typeof validator.value === 'undefined') {
		return undefined;
	} else if (!['min-number-value', 'max-number-value'].includes(validator.type)) {
		delete newValidator.value;
	}

	if(['min-length', 'max-length', 'exact-length'].includes(validator.type) && typeof validator.threshold === 'undefined') {
		return undefined;
	} else if (!['min-length', 'max-length', 'exact-length'].includes(validator.type)) {
		delete newValidator.threshold;
	}

	if(['pattern'].includes(validator.type) && typeof validator.pattern === 'undefined') {
		return undefined;
	} else if (!['pattern'].includes(validator.type)) {
		delete newValidator.pattern;
	}

	console.log(newValidator);

	return newValidator;
}).filter(Boolean);

export default prepareValidate;
