import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useTheme } from "../Context/ThemeContext";
import { useTodosData } from "../components/useTodosData.js";
import { TodoColumn } from "../components/TodoColumn";
import { Page, Title, AddRow, Input, Button, Columns, SectionTitle, UsersWrap, UserRow, Muted, } from "../components/todo-styles";
export default function ToDo() {
    const { theme, setTheme } = useTheme();
    const { users, newTitle, setNewTitle, loading, adding, addTodo, removeAll, markCompleted, deleteTodo, onKeyDown, todoList, completedList, } = useTodosData();
    return (_jsxs(Page, { "$theme": theme, children: [_jsx(Title, { children: "Todos" }), _jsxs(AddRow, { children: [_jsx(Input, { "$theme": theme, value: newTitle, onChange: (e) => setNewTitle(e.target.value), onKeyDown: onKeyDown, placeholder: "Add a new todo..." }), _jsx(Button, { onClick: addTodo, disabled: adding || !newTitle.trim(), children: adding ? "Adding..." : "Add Todo" }), _jsx(Button, { onClick: removeAll, children: "Remove All" }), _jsxs(Button, { onClick: () => setTheme(theme === "light" ? "dark" : "light"), children: ["Theme: ", theme] })] }), loading ? (_jsx(Muted, { "$theme": theme, children: "Loading todos and users..." })) : (_jsxs(Columns, { children: [_jsx(TodoColumn, { title: "To Do", items: todoList, onComplete: markCompleted, onDelete: deleteTodo }), _jsx(TodoColumn, { title: "Completed", items: completedList, onComplete: markCompleted, onDelete: deleteTodo })] })), _jsx(SectionTitle, { children: "Users" }), _jsx(UsersWrap, { "$theme": theme, children: users.length === 0 ? (_jsx(Muted, { "$theme": theme, children: "No users loaded." })) : (users.map((u) => (_jsxs(UserRow, { "$theme": theme, children: [_jsx("strong", { children: u.name }), " \u2014 ", u.email] }, u.id)))) })] }));
}
//# sourceMappingURL=ToDo.js.map
//# sourceMappingURL=ToDo.js.map