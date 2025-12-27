

export const isRequired = (value) => {
    return value.length > 0;
}
//all thats left is max, min, and email
export const hasMin = (value, min) => {
    return value.length >= min;
}
export const hasMax = (value, max) => {
    return value.length <= max;
}
export const isEmail = (value) => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(value); //you use test with regex
}

export const validateValue = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = isValid && isRequired(value);
    }

    if (rules.min) {
        isValid = isValid && hasMin(value, rules.min);
    }

    if (rules.max) {
        isValid = isValid && hasMax(value, rules.max);
    }

    if (rules.email) {
        isValid = isValid && isEmail(value);
    }

    return isValid;
}