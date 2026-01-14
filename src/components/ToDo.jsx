import styled from "styled-components";
import {useEffect, useState} from "react";

const Page = styled.div`
    margin: 0;
    font-family: "Times New Roman", Times, serif;
    background-color: #fff8e8;
    padding-top: 60px;
`;

const rows = [
    {
        school: "European History Homework",
        house: "Clean the bathroom/living room",
        groceries: "Get tomatoes for salad",
    },
    {
        school: "Spanish Vocabulary Flashcards",
        house: "Vacuum the house",
        groceries: "Buy milk and eggs",
    },
    {
        school: "Math Problem Set",
        house: "Dust the shelves",
        groceries: "Order bread online",
    },
    {
        school: "Science Lab Report",
        house: "Organize closet",
        groceries: "Pick up fruit",
    },
    {
        school: "Computer Science Coding",
        house: "Water the plants",
        groceries: "Restock pantry staples",
    },
];


function ToDo() {
    const [todos, setToDos] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(data => {
                setToDos(data)
            });
    }, []);
    console.log(todos);
    return (
        <Page>
            <div className="info">
                <h3 id="listTitle">To Do List</h3>
                <table>
                    <thead>
                    <tr>
                        <th>School</th>
                        <th>House</th>
                        <th>Groceries</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td>{r.school}</td>
                            <td>{r.house}</td>
                            <td>{r.groceries}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Page>
    );
}

export default ToDo;