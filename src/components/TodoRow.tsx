import React, { useCallback } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";

type Id = string | number;

type Props = {
    id: Id;
    title: string;
    completed: boolean;
    onComplete: (id: Id) => void;
    onDelete: (id: Id) => void;
};

export const TodoRow = React.memo(function TodoRow({
                                                       id,
                                                       title,
                                                       completed,
                                                       onComplete,
                                                       onDelete,
                                                   }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleComplete = useCallback(() => {
        onComplete(id);
    }, [onComplete, id]);

    const handleDelete = useCallback(() => {
        onDelete(id);
    }, [onDelete, id]);

    return (
        <Box
            sx={{
                borderRadius: "8px",
                px: 1,
                py: 0.9,
                mb: 1,
                bgcolor: isDark ? "#111827" : "#f8fafc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: `1px solid ${isDark ? "#1f2937" : "#dbe2ea"}`,
            }}
        >
            <Typography sx={{ flex: 1, mr: 1, fontSize: "0.95rem" }}>
                {title}
            </Typography>

            <Stack direction="row" spacing={1}>
                {!completed && (
                    <Button
                        size="small"
                        onClick={handleComplete}
                        sx={{
                            borderRadius: "6px",
                            px: 1.2,
                            py: 0.4,
                            fontSize: "0.78rem",
                            minWidth: "auto",
                            bgcolor: "#dcfce7",
                            color: "#166534",
                            "&:hover": { bgcolor: "#bbf7d0" },
                        }}
                        variant="contained"
                    >
                        Complete
                    </Button>
                )}

                <Button
                    size="small"
                    onClick={handleDelete}
                    sx={{
                        borderRadius: "6px",
                        px: 1.2,
                        py: 0.4,
                        fontSize: "0.78rem",
                        minWidth: "auto",
                        bgcolor: "#fee2e2",
                        color: "#b91c1c",
                        "&:hover": { bgcolor: "#fecaca" },
                    }}
                    variant="contained"
                >
                    Delete
                </Button>
            </Stack>
        </Box>
    );
});