import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const Page = styled.div`
    font-family: system-ui, sans-serif;
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    background: #f5f7fa;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 600;
`;

const AddRow = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;
const Input = styled.input`
    flex: 1;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    background: white;
    transition: border-color 0.15s ease, background-color 0.15s ease;

    &:focus {
        border-color: #64748b;
        background-color: #f0f2f5;
        outline: none;
    }
`;
const Button = styled.button`
    padding: 0.6rem 1rem;
    border-radius: 8px;
    border: none;
    background: #3b82f6;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background: #2563eb;
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const Columns = styled.div`
    display: flex;
    gap: 1rem;
`;

const Column = styled.div`
    flex: 1;
    border-radius: 10px;
    min-height: 300px;
    padding: 0.75rem;
    background: white;
    border: 1px solid #e2e8f0;
    transition: background-color 0.2s ease;
`;

const ColumnTitle = styled.h2`
    text-align: center;
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
`;

const TodoItem = styled.div`
    border-radius: 8px;
    padding: 0.55rem 0.6rem;
    margin-bottom: 0.5rem;
    background: #f8fafc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #dbe2ea;
    transition: background-color 0.15s ease;

    &:hover {
        background: #eef2f5;
    }
`;

const TodoTitle = styled.span`
    flex: 1;
    margin-right: 0.5rem;
    font-size: 0.95rem;
`;

const TodoActions = styled.div`
    display: flex;
    gap: 0.4rem;
`;

const SmallBtn = styled.button`
    border: none;
    border-radius: 6px;
    padding: 0.25rem 0.6rem;
    font-size: 0.78rem;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const CompleteBtn = styled(SmallBtn)`
    background: #dcfce7;
    color: #166534;

    &:hover {
        background: #bbf7d0;
    }
`;

const DeleteBtn = styled(SmallBtn)`
    background: #fee2e2;
    color: #b91c1c;

    &:hover {
        background: #fecaca;
    }
`;

const SectionTitle = styled.h2`
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
`;

const UsersWrap = styled.div`
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 0.75rem;
`;

const UserRow = styled.div`
    padding: 0.5rem 0.25rem;
    border-bottom: 1px solid #eef2f7;

    &:last-child {
        border-bottom: none;
    }
`;

const Muted = styled.p`
    margin: 0.5rem 0 0;
    color: #475569;
    font-size: 0.9rem;
`;

export default function TodosOneFile() {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const createAbortRef = useRef(null); //to cancel

    const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
    const USERS_URL = "https://jsonplaceholder.typicode.com/users";

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                const [todosRes, usersRes] = await Promise.all([
                    fetch(TODOS_URL).then((r) => r.json()),
                    fetch(USERS_URL).then((r) => r.json()),
                ]);

                if (cancelled) return;
                setTodos((todosRes || []).slice(0, 20));
                setUsers(usersRes || []);
            } catch (e) {
                console.log(e)
            } finally {
                if (!cancelled)
                    setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
            if (createAbortRef.current)
                createAbortRef.current.abort();
        };
    }, []);

    const todoList = todos.filter((t) => !t.completed);
    const completedList = todos.filter((t) => t.completed);

    async function addTodo() {
        const title = newTitle.trim();
        if (!title)
            return;

        if (createAbortRef.current) createAbortRef.current.abort();
        createAbortRef.current = new AbortController();

        try {
            setAdding(true);

            const created = await fetch(TODOS_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title, completed: false, userId: 1}),
                signal: createAbortRef.current.signal,
            }).then((r) => r.json());
            setTodos((prev) => [
                {
                    id: created.id,
                    title: created.title,
                    completed: created.completed,
                    userId: created.userId,
                },
                ...prev,
            ]);

            setNewTitle("");
        } catch (e) {
            console.log(e)
        } finally {
            setAdding(false);
        }
    }

    function removeAll() {
        setTodos([]);
    }

    async function markCompleted(id) {
        try {
            await fetch(TODOS_URL + "/" + id, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({completed: true}),
            }).then((r) => r.json());

            setTodos((prev) => prev.map((t) => (t.id === id ? {...t, completed: true} : t)));
        } catch (e) {
            console.log(e)
        }
    }

    async function deleteTodo(id) {
        try {
            await fetch(TODOS_URL + "/" + id, {method: "DELETE"}).then(() => undefined);
            setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch (e) {
            console.log(e) //will fix later
        }
    }

    function onKeyDown(e) {
        if (e.key === "Enter")
            addTodo();
    }

    return (
        <Page>
            <Title>Todos</Title>
            <AddRow>
                <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Add a new todo..."
                />
                <Button onClick={addTodo} disabled={adding || !newTitle.trim()}>
                    {adding ? "Adding..." : "Add Todo"}
                </Button>
                <Button onClick={removeAll}>Remove All</Button>
            </AddRow>
            {loading ? (
                <Muted>Loading todos and users...</Muted>
            ) : (
                <Columns>
                    <Column>
                        <ColumnTitle>To Do</ColumnTitle>
                        {todoList.length === 0 ? (
                            <Muted>No todos here.</Muted>
                        ) : (
                            todoList.map((t) => (
                                <TodoItem key={t.id}>
                                    <TodoTitle>{t.title}</TodoTitle>
                                    <TodoActions>
                                        <CompleteBtn onClick={() => markCompleted(t.id)}>Complete</CompleteBtn>
                                        <DeleteBtn onClick={() => deleteTodo(t.id)}>Delete</DeleteBtn>
                                    </TodoActions>
                                </TodoItem>
                            ))
                        )}
                    </Column>

                    <Column>
                        <ColumnTitle>Completed</ColumnTitle>
                        {completedList.length === 0 ? (
                            <Muted>No completed todos yet.</Muted>
                        ) : (
                            completedList.map((t) => (
                                <TodoItem key={t.id}>
                                    <TodoTitle>{t.title}</TodoTitle>
                                    <TodoActions>
                                        <DeleteBtn onClick={() => deleteTodo(t.id)}>Delete</DeleteBtn>
                                    </TodoActions>
                                </TodoItem>
                            ))
                        )}
                    </Column>
                </Columns>
            )}

            <SectionTitle>Users</SectionTitle>
            <UsersWrap>
                {users.length === 0 ? (
                    <Muted>No users loaded.</Muted>
                ) : (
                    users.map((u) => (
                        <UserRow key={u.id}>
                            <strong>{u.name}</strong> — {u.email}
                        </UserRow>
                    ))
                )}
            </UsersWrap>
        </Page>
    );
}