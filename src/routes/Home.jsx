import {useEffect, useState} from "react";
import styled from "styled-components";

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

const PostsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PostCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 12px;
    background-color: #fff;
`;

const PostTitle = styled.h3`
    margin: 0 0 4px 0;
    font-size: 16px;
`;

const PostBody = styled.p`
    margin: 0;
    font-size: 14px;
    color: #555;
`;

function Home() {
    const [state, setState] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        fetch("https://jsonplaceholder.typicode.com/posts", {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((data) => {
                setState(data);
            })
            .catch((err) => console.log(err));

        return () => {
            controller.abort();
        };
    }, []);

    console.log(state);

    return (
        <Wrapper>
            <Title>This is home</Title>
            <PostsList>
                {state.map((post) => ( //goes thorugh all of them
                    <PostCard key={post.id}>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "#777",
                            }}
                        >
                            {/*why is userId not recongized????*/}
                            {/*User {post.userId} */}
                            Post {post.id}
                        </p>

                        <PostTitle>Title: {post.title}</PostTitle>
                        <PostBody>Body: {post.body}</PostBody>
                    </PostCard>
                ))}
            </PostsList>
        </Wrapper>
    );
}

export default Home;