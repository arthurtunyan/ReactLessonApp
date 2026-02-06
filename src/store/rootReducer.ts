import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import todosReducer from "./todo-slice";
import usersReducer from "./users-slice";
import { counterReducer } from "./toDoReducer.ts";


export const store = configureStore({
    reducer: {
        todos: todosReducer,
        users: usersReducer,
        counter: counterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;