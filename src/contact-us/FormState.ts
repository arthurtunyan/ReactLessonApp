import {validateValue} from "./validationFunctions";

export type ValidationRules = {
    required?: boolean;
    min?: number;
    max?: number;
    email?: boolean;
};
export type Field<T> = {
    isTouched?: boolean;
    validationRules?: ValidationRules;
    isValid?: boolean;
    value: T;
};
export type FormState = {
    inquiry: Field<string>;
    name: Field<string>;
    email: Field<string>;
    message: Field<string>;
    attachment: Field<File | null>;
};
export const initialState: FormState = {
    inquiry: {
        isTouched: false,
        validationRules: {
            required: true,
            min: 1,
            max: 20,
            email: false,
        },
        isValid: false,
        value: "",
    },
    name: {
        isTouched: false,
        validationRules: {
            required: true,
            min: 6,
            max: 20,
            email: false,
        },
        isValid: false,
        value: "",
    },
    email: {
        isTouched: false,
        validationRules: {
            required: true,
            min: 5,
            max: 50,
            email: true,
        },
        isValid: false,
        value: "",
    },
    message: {
        validationRules: {
            required: true,
            min: 10,
            max: 500,
            email: false,
        },
        isValid: false,
        isTouched: false,
        value: "",
    },
    attachment: {
        value: null,
    },
};

export const actions = {
    UPDATE_FIELD: "UPDATE_FIELD",
    TOUCH_FIELD: "TOUCH_FIELD",
    RESET: "RESET",
} as const;

export type Action =
    | {
    type: typeof actions.UPDATE_FIELD;
    payload: { key: keyof FormState; value: any };
}
    | {
    type: typeof actions.TOUCH_FIELD;
    payload: { key: keyof FormState };
}
    | {
    type: typeof actions.RESET;
};

export const reducer = (state: FormState, action: Action): FormState => {
    switch (action.type) {
        case actions.UPDATE_FIELD: {
            const name = action.payload.key;
            const value = action.payload.value;
            const field = state[name];
            let isValid = field.isValid ?? false;

            if (field.validationRules) {
                isValid = validateValue(value, field.validationRules);
            }
            return {
                ...state,
                [name]: {
                    ...field,
                    value: value,
                    isValid: isValid,
                },
            };
        }
        case actions.TOUCH_FIELD: {
            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    isTouched: true,
                },
            };
        }
        case actions.RESET:
        default:
            return state;
    }
};