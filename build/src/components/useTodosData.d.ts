export function useTodosData(): {
    todos: never[];
    users: never[];
    newTitle: string;
    setNewTitle: import("react").Dispatch<import("react").SetStateAction<string>>;
    loading: boolean;
    adding: boolean;
    addTodo: () => Promise<void>;
    removeAll: () => void;
    markCompleted: (id: any) => Promise<void>;
    deleteTodo: (id: any) => Promise<void>;
    onKeyDown: (e: any) => void;
    todoList: any[];
    completedList: any[];
};
//# sourceMappingURL=useTodosData.d.ts.map