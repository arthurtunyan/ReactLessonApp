import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../components/Types";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export interface UsersState {
    users: User[];
    status: "idle" | "pending" | "fulfilled" | "rejected";
    error?: string;
}

const initialState: UsersState = {
    users: [],
    status: "idle",
};

export const fetchUsers = createAsyncThunk<User[]>("users/fetch", async () => {
    const response = await fetch(USERS_URL);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = (await response.json()) as User[];
    return data;
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "pending";
                state.error = undefined;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;