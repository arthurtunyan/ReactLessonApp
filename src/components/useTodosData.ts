import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {Todo, TodoId, User} from "./Types.ts";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";


export function useTodosData() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    //todo when you add boolean variables call them isadding, isloading, not just adding

    const createAbortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                setLoading(true);
                const [todosRes, usersRes] = (await Promise.all([
                    fetch(TODOS_URL, {signal: controller.signal}).then((r) => r.json()),
                    fetch(USERS_URL, {signal: controller.signal}).then((r) => r.json()),
                ])) as [unknown, unknown];

                const todosArr = Array.isArray(todosRes) ? (todosRes as Todo[]) : [];
                const usersArr = Array.isArray(usersRes) ? (usersRes as User[]) : [];

                setTodos(todosArr.slice(0, 20));
                setUsers(usersArr);
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        load();
        return () => {
            controller.abort();
            if (createAbortRef.current) createAbortRef.current.abort();
        };
    }, []);

    const addTodo = useCallback(async () => {
        const title = newTitle.trim();
        if (!title) return;

        if (createAbortRef.current) createAbortRef.current.abort();
        createAbortRef.current = new AbortController();

        try {
            setAdding(true);
            const created = (await fetch(TODOS_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title, completed: false, userId: 1}),
                signal: createAbortRef.current.signal,
            }).then((r) => r.json())) as Partial<Todo>;

            setTodos((prev) => [
                {
                    id: created.id ?? `${Date.now()}-${Math.random()}`,
                    title: created.title ?? title,
                    completed: Boolean(created.completed),
                    userId: created.userId ?? 1,
                },
                ...prev,
            ]);

            setNewTitle("");
        } catch (e) {
            if (e instanceof DOMException && e.name === "AbortError") return;
            console.log(e);
        } finally {
            setAdding(false);
        }
    }, [newTitle]);

    const removeAll = useCallback(() => {
        setTodos([]);
    }, []);

    const markCompleted = useCallback(async (id: TodoId) => {
        try {
            await fetch(`${TODOS_URL}/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({completed: true}),
            }).then((r) => r.json());

            //only the changed todo becomes a new object
            setTodos((prev) =>
                prev.map((t) => (t.id === id ? {...t, completed: true} : t))
            );
        } catch (e: unknown) {
            console.log(e);
        }
    }, []);

    const deleteTodo = useCallback(async (id: TodoId) => {
        try {
            await fetch(`${TODOS_URL}/${id}`, {method: "DELETE"}).then(() => undefined);
            setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch (e: unknown) {
            console.log(e);
        }
    }, []);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                void addTodo();
            }
        },
        [addTodo]
    );

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