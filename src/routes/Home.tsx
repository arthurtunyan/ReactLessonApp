import {useEffect, useState} from "react";
import PostsList from "../components/PostsList";
import {Box, Typography} from "@mui/material";
import type {RootState} from "../store/rootReducer.ts";
import {useSelector} from "react-redux";


/**
 * @typedef {object} Post
 * @property {number} id
 * @property {number} userId
 * @property {string} title
 * @property {string} body
 *
 */
function Home() {
    const [posts, setPosts] = useState(/** @type {Post[]} */[]);
    const count = useSelector((state: RootState) => state.counter.value)
    console.log(count);
    
    useEffect(() => {
        const controller = new AbortController();
        fetch("https://jsonplaceholder.typicode.com/posts", {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => console.log(err));

        return () => {
            controller.abort();
        };
    }, []);

    // console.log(state);

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", my: 3, px: 2, fontFamily: "Arial" }}>
            <Typography sx={{ mb: 2, fontSize: 28, fontWeight: 700 }}>
                This is home
            </Typography>
            <PostsList posts={posts} />
        </Box>
    );
}

export default Home;