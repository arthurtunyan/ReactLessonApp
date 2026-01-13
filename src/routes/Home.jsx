import {useEffect, useState} from "react";
import styled from "styled-components";
import PostsList from "../components/PostsList";


const Wrapper = styled.div` //start to use more of this to get used to it
    max-width: 800px;
    margin: 24px auto;
    padding: 0 16px;
    font-family: Arial;
`;

const Title = styled.h1`
    margin-bottom: 16px;
    font-size: 28px;
`;





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
        <Wrapper>
            <Title>This is home</Title>
            <PostsList  posts={posts}/>
        </Wrapper>
    );
}

export default Home;