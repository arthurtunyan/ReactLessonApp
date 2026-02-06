import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodoId } from "../components/Types";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

export interface TodoState {
    todos: Todo[];
    status: "idle" | "pending" | "fulfilled" | "rejected";
    isMutating: boolean;
    error?: string;
}

const initialState: TodoState = {
    todos: [],
    status: "idle",
    isMutating: false,
};

export const fetchTodos = createAsyncThunk<Todo[]>("todos/fetch", async () => {
    const response = await fetch(TODOS_URL);
    if (!response.ok) throw new Error("Failed to fetch todos");
    const data = (await response.json()) as Todo[];
    return data.slice(0, 20);
});

export const addTodo = createAsyncThunk<Todo, { title: string; userId?: number }>(
    "todos/add",
    async ({ title, userId }) => {
        const response = await fetch(TODOS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, completed: false, userId: userId ?? 1 }),
        });
        if (!response.ok) throw new Error("Failed to add todo");
        const data = (await response.json()) as Partial<Todo>;
        return {
            id: (data.id ?? Date.now()) as TodoId,
            title: (data.title ?? title) as string,
            completed: Boolean(data.completed ?? false),
            userId: (data.userId ?? userId ?? 1) as number,
        };
    }
);

export const deleteTodo = createAsyncThunk<TodoId, TodoId>("todos/delete", async (id) => {
    const response = await fetch(`${TODOS_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete todo");
    return id;
});

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        toggleCompleted: (state, action: PayloadAction<TodoId>) => {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        clearAll: (state) => {
            state.todos = [];
            state.status = "fulfilled";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = "pending";
                state.error = undefined;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(addTodo.pending, (state) => {
                state.isMutating = true;
                state.error = undefined;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.isMutating = false;
                state.todos.unshift(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.isMutating = false;
                state.error = action.error.message;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isMutating = true;
                state.error = undefined;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isMutating = false;
                state.todos = state.todos.filter((t) => t.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isMutating = false;
                state.error = action.error.message;
            });
    },
});

export const { toggleCompleted, clearAll } = todosSlice.actions;
export default todosSlice.reducer;