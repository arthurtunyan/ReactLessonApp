import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Column, ColumnTitle, Muted } from "./todo-styles";
import { TodoRow } from "./TodoRow";
import { useTheme } from "../Context/ThemeContext";
export function TodoColumn({ title, items, onComplete, onDelete }) {
    const { theme } = useTheme();
    return (_jsxs(Column, { "$theme": theme, children: [_jsx(ColumnTitle, { children: title }), items.length === 0 ? (_jsx(Muted, { "$theme": theme, children: title === "To Do" ? "No todos here." : "No completed todos yet." })) : (items.map((t) => (_jsx(TodoRow, { id: t.id, title: t.title, completed: t.completed, onComplete: onComplete, onDelete: onDelete }, t.id))))] }));
}
//# sourceMappingURL=ToDoColumn.js.map
//# sourceMappingURL=ToDoColumn.js.map