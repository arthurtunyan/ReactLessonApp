import { Box, Typography } from "@mui/material";
import { TodoRow } from "./TodoRow";
import { useTheme } from "../Context/ThemeContext";
type Id = string | number;
type TodoItem = {
    id: Id;
    title: string;
    completed: boolean;
};
type Props = {
    title: string;
    items: TodoItem[];
    onComplete: (id: Id) => void;
    onDelete: (id: Id) => void;
};
export function TodoColumn({ title, items, onComplete, onDelete }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Box
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
        >
            <Typography
                sx={{
                    textAlign: "center",
                    mt: 0,
                    mb: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                }}
            >
                {title}
            </Typography>

            {items.length === 0 ? (
                <Typography sx={{ m: 0.5, color: isDark ? "#94a3b8" : "#475569", fontSize: "0.9rem" }}>
                    {title === "To Do" ? "No todos here." : "No completed todos yet."}
                </Typography>
            ) : (
                items.map((t) => (
                    <TodoRow
                        key={String(t.id)}
                        id={t.id}
                        title={t.title}
                        completed={t.completed}
                        onComplete={onComplete}
                        onDelete={onDelete}
                    />
                ))
            )}
        </Box>
    );
}