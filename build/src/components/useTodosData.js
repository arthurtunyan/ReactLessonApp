import { useCallback, useEffect, useMemo, useRef, useState } from "react";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
export function useTodosData() {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const createAbortRef = useRef(null);
    useEffect(() => {
        const controller = new AbortController();
        async function load() {
            try {
                setLoading(true);
                const [todosRes, usersRes] = await Promise.all([
                    fetch(TODOS_URL, { signal: controller.signal }).then((r) => r.json()),
                    fetch(USERS_URL, { signal: controller.signal }).then((r) => r.json()),
                ]);
                setTodos((todosRes || []).slice(0, 20));
                setUsers(usersRes || []);
            }
            catch (e) {
                if (e.name !== "AbortError")
                    console.log(e);
            }
            finally {
                setLoading(false);
            }
        }
        load();
        return () => {
            controller.abort();
            if (createAbortRef.current)
                createAbortRef.current.abort();
        };
    }, []);
    const addTodo = useCallback(async () => {
        const title = newTitle.trim();
        if (!title)
            return;
        if (createAbortRef.current)
            createAbortRef.current.abort();
        createAbortRef.current = new AbortController();
        try {
            setAdding(true);
            const created = await fetch(TODOS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, completed: false, userId: 1 }),
                signal: createAbortRef.current.signal,
            }).then((r) => r.json());
            setTodos((prev) => [
                {
                    id: created.id ?? crypto.randomUUID(),
                    title: created.title ?? title,
                    completed: Boolean(created.completed),
                    userId: created.userId ?? 1,
                },
                ...prev,
            ]);
            setNewTitle("");
        }
        catch (e) {
            if (e.name !== "AbortError")
                console.log(e);
        }
        finally {
            setAdding(false);
        }
    }, [newTitle]);
    const removeAll = useCallback(() => {
        setTodos([]);
    }, []);
    const markCompleted = useCallback(async (id) => {
        try {
            await fetch(`${TODOS_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: true }),
            }).then((r) => r.json());
            //only the changed todo becomes a new object
            setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: true } : t)));
        }
        catch (e) {
            console.log(e);
        }
    }, []);
    const deleteTodo = useCallback(async (id) => {
        try {
            await fetch(`${TODOS_URL}/${id}`, { method: "DELETE" }).then(() => undefined);
            setTodos((prev) => prev.filter((t) => t.id !== id));
        }
        catch (e) {
            console.log(e);
        }
    }, []);
    const onKeyDown = useCallback((e) => {
        if (e.key === "Enter")
            addTodo();
    }, [addTodo]);
    const todoList = useMemo(() => todos.filter((t) => !t.completed), [todos]);
    const completedList = useMemo(() => todos.filter((t) => t.completed), [todos]);
    return {
        todos,
        users,
        newTitle,
        setNewTitle,
        loading,
        adding,
        addTodo,
        removeAll,
        markCompleted,
        deleteTodo,
        onKeyDown,
        todoList,
        completedList,
    };
}
//# sourceMappingURL=useTodosData.js.map