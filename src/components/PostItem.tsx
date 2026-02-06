import {Box, Typography} from "@mui/material";
import {useTheme} from "../Context/ThemeContext";
import type {PostItemProps} from "./Types.ts";

function PostItem({post}: PostItemProps) {
    const {theme} = useTheme();
    console.log(theme);

    return (
        <Box
            sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                px: "12px",
                py: "10px",
                bgcolor: "#fff",
                m: post.id % 2 === 0 ? "10px" : "0px",
            }}
        >
            <Typography sx={{fontSize: "12px", color: "#777", mb: 0.5}}>
                User {post.userId} Post {post.id}
            </Typography>

            <Typography sx={{mb: "4px", fontSize: "16px", fontWeight: 600}}>
                Title: {post.title}
            </Typography>

            <Typography sx={{fontSize: "14px", color: "#555"}}>
                Body: {post.body}
            </Typography>
        </Box>
    );
}

export default PostItem;