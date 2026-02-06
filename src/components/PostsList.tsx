import type { FC } from "react";
import { Box } from "@mui/material";
import PostItem from "./PostItem";
import type {PostsListProps} from "./Types.ts";


const PostsList: FC<PostsListProps> = ({ posts }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </Box>
    );
};

export default PostsList;