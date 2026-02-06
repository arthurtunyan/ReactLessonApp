import type { ValidationRules } from "./FormState";

export const isRequired = (value: string): boolean => {
    return value.length > 0;
};

export const hasMin = (value: string, min: number): boolean => {
    return value.length >= min;
};

export const hasMax = (value: string, max: number): boolean => {
    return value.length <= max;
};

export const isEmail = (value: string): boolean => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(value);
};

export const validateValue = (value: string, rules: ValidationRules): boolean => {
    let isValid = true;

    if (rules.required) {
        isValid = isValid && isRequired(value);
    }

    if (rules.min != null) {
        isValid = isValid && hasMin(value, rules.min);
    }

    if (rules.max != null) {
        isValid = isValid && hasMax(value, rules.max);
    }

    if (rules.email) {
        isValid = isValid && isEmail(value);
    }

    return isValid;
};