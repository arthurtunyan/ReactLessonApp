import {validateValue} from "./validationFunctions";

export const initialState = {
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
}

export const reducer = (state, action)=>{

    switch(action.type) {
        case actions.UPDATE_FIELD:{
            const name = action.payload.key;
            const value = action.payload.value;
            const field = state[name];
            let isValid = field.isValid;
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
        case actions.TOUCH_FIELD:{
            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    isTouched: true,
                }
            }
        }
        case actions.RESET:
        default:
            return state;

    }
}