import {useEffect, useState} from "react";

function Home() {
    const [state, setState] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        fetch("https://jsonplaceholder.typicode.com/posts", {
            signal: controller.signal,
        })
            .then(res => res.json())
            .then(data => {
                setState(data)
            })
            .catch(err => console.log(err))
        return () => {
            controller.abort();
        }

    }, [])

    console.log(state);
    return (
        <h1>This is home</h1>
    )
}

export default Home;