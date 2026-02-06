import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback } from "react";
import { TodoItem, TodoTitle, TodoActions, CompleteBtn, DeleteBtn } from "./todo-styles.jsx";
import { useTheme } from "../Context/ThemeContext";
export const TodoRow = React.memo(function TodoRow({ id, title, completed, onComplete, onDelete, }) {
    const { theme } = useTheme();
    const handleComplete = useCallback(() => {
        onComplete(id);
    }, [onComplete, id]);
    const handleDelete = useCallback(() => {
        onDelete(id);
    }, [onDelete, id]);
    return (_jsxs(TodoItem, { "$theme": theme, children: [_jsx(TodoTitle, { children: title }), _jsxs(TodoActions, { children: [!completed && _jsx(CompleteBtn, { onClick: handleComplete, children: "Complete" }), _jsx(DeleteBtn, { onClick: handleDelete, children: "Delete" })] })] }));
});
//# sourceMappingURL=TodoRow.js.map
//# sourceMappingURL=TodoRow.js.map