import React, { useEffect, useMemo, useState } from "react";
import { Box, Paper, Typography, TextField, Stack, Button as MuiButton } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import { TodoColumn } from "../components/ToDoColumn";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTodos, addTodo, deleteTodo, toggleCompleted, clearAll } from "../store/todo-slice";
import { fetchUsers } from "../store/users-slice";
import type { TodoId } from "../components/Types";

export default function ToDo() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    const dispatch = useAppDispatch();

    const [newTitle, setNewTitle] = useState("");

    const todos = useAppSelector((s) => s.todos.todos);
    const todosStatus = useAppSelector((s) => s.todos.status);
    const isMutating = useAppSelector((s) => s.todos.isMutating);

    const users = useAppSelector((s) => s.users.users);
    const usersStatus = useAppSelector((s) => s.users.status);

    useEffect(() => {
        dispatch(fetchTodos());
        dispatch(fetchUsers());
    }, [dispatch]);

    const todoList = useMemo(() => todos.filter((t) => !t.completed), [todos]);
    const completedList = useMemo(() => todos.filter((t) => t.completed), [todos]);

    const loading = todosStatus === "pending" || usersStatus === "pending";
    const adding = isMutating;

    const onAddTodo = () => {
        const title = newTitle.trim();
        if (!title) return;
        dispatch(addTodo({ title }));
        setNewTitle("");
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onAddTodo();
    };

    const onDeleteTodo = (id: TodoId) => {
        dispatch(deleteTodo(id));
    };

    const onToggleCompleted = (id: TodoId) => {
        dispatch(toggleCompleted(id));
    };

    const onRemoveAll = () => {
        dispatch(clearAll());
    };

    return (
        <Box
            sx={{
                fontFamily: "sans-serif",
                maxWidth: 900,
                mx: "auto",
                my: 4,
                px: 2,
                bgcolor: isDark ? "#0b1220" : "#f5f7fa",
                color: isDark ? "#e5e7eb" : "#0f172a",
                borderRadius: 2,
                py: 3,
            }}
        >
            <Typography
                sx={{
                    textAlign: "center",
                    mb: 3,
                    fontWeight: 600,
                    fontSize: 32,
                }}
            >
                Todos
            </Typography>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
                <TextField
                    value={newTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Add a new todo..."
                    fullWidth
                    sx={{
                        flex: 1,
                        minWidth: 220,
                        "& .MuiInputBase-root": {
                            borderRadius: "8px",
                            bgcolor: isDark ? "#0f172a" : "white",
                            color: isDark ? "#e5e7eb" : "#0f172a",
                            paddingY: "0.1rem",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDark ? "#1f2937" : "#cbd5e1",
                        },
                        "& .MuiInputBase-root.Mui-focused": {
                            bgcolor: isDark ? "#111827" : "#f0f2f5",
                        },
                        "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: isDark ? "#60a5fa" : "#64748b",
                        },
                    }}
                />

                <MuiButton
                    onClick={onAddTodo}
                    disabled={adding || !newTitle.trim()}
                    variant="contained"
                    sx={{ borderRadius: "8px", px: 2, py: 1.1 }}
                >
                    {adding ? "Adding..." : "Add Todo"}
                </MuiButton>

                <MuiButton
                    onClick={onRemoveAll}
                    variant="contained"
                    sx={{
                        borderRadius: "8px",
                        px: 2,
                        py: 1.1,
                        bgcolor: isDark ? "#334155" : "#3b82f6",
                        "&:hover": { bgcolor: isDark ? "#1f2937" : "#2563eb" },
                    }}
                >
                    Remove All
                </MuiButton>

                <MuiButton
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    variant="contained"
                    sx={{
                        borderRadius: "8px",
                        px: 2,
                        py: 1.1,
                        bgcolor: isDark ? "#334155" : "#3b82f6",
                        "&:hover": { bgcolor: isDark ? "#1f2937" : "#2563eb" },
                    }}
                >
                    Theme: {theme}
                </MuiButton>
            </Stack>

            {loading ? (
                <Typography sx={{ m: 0.5, color: isDark ? "#94a3b8" : "#475569", fontSize: "0.9rem" }}>
                    Loading todos and users...
                </Typography>
            ) : (
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                    <Paper
                        sx={{
                            flex: 1,
                            minWidth: 280,
                            borderRadius: "10px",
                            minHeight: 300,
                            p: 1.5,
                            bgcolor: isDark ? "#0f172a" : "white",
                            border: `1px solid ${isDark ? "#1f2937" : "#e2e8f0"}`,
                            color: "inherit",
                        }}
                        elevation={0}
                    >
                        <TodoColumn title="To Do" items={todoList} onComplete={onToggleCompleted} onDelete={onDeleteTodo} />
                    </Paper>

                    <Paper
                        sx={{
                            flex: 1,
                            minWidth: 280,
                            borderRadius: "10px",
                            minHeight: 300,
                            p: 1.5,
                            bgcolor: isDark ? "#0f172a" : "white",
                            border: `1px solid ${isDark ? "#1f2937" : "#e2e8f0"}`,
                            color: "inherit",
                        }}
                        elevation={0}
                    >
                        <TodoColumn
                            title="Completed"
                            items={completedList}
                            onComplete={onToggleCompleted}
                            onDelete={onDeleteTodo}
                        />
                    </Paper>
                </Stack>
            )}

            <Typography sx={{ mt: 3, mb: 1.5, fontSize: "1rem", fontWeight: 600 }}>Users</Typography>

            <Paper
                sx={{
                    bgcolor: isDark ? "#0f172a" : "white",
                    border: `1px solid ${isDark ? "#1f2937" : "#e2e8f0"}`,
                    borderRadius: "10px",
                    p: 1.5,
                    color: "inherit",
                }}
                elevation={0}
            >
                {users.length === 0 ? (
                    <Typography sx={{ m: 0.5, color: isDark ? "#94a3b8" : "#475569", fontSize: "0.9rem" }}>
                        No users loaded.
                    </Typography>
                ) : (
                    users.map((u, idx) => (
                        <Box
                            key={u.id}
                            sx={{
                                py: 1,
                                px: 0.5,
                                borderBottom: idx === users.length - 1 ? "none" : `1px solid ${isDark ? "#1f2937" : "#eef2f7"}`,
                            }}
                        >
                            <Typography sx={{ fontSize: "0.95rem" }}>
                                <strong>{u.name}</strong> — {u.email}
                            </Typography>
                        </Box>
                    ))
                )}
            </Paper>
        </Box>
    );
}