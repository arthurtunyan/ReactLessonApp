import type {Action, PayloadAction} from "@reduxjs/toolkit";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INCREMENT_BY_AMOUNT = "INCREMENT_BY_AMOUNT";

const initialState = {
    value: 0,
}

export const counterReducer = (state = initialState, action: Action | PayloadAction<number>) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1,
            }
        case DECREMENT:
            return {
                ...state,
                value: state.value - 1,
            }
        case INCREMENT_BY_AMOUNT:
            return {
                ...state,
                value: state.value + (action as PayloadAction<number>).payload,
            }
        default:
            return state;
    }
}