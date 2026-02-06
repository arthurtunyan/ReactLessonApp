import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/rootReducer";
import {DECREMENT, INCREMENT, INCREMENT_BY_AMOUNT} from "../store/toDoReducer.ts";
import {useState} from "react";

function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState("2");

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch({type: INCREMENT})}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch({type: DECREMENT})}
                >
                    Decrement
                </button>
                <input
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(e.target.value)}
                />
                <button
                    onClick={() =>
                        dispatch({type: INCREMENT_BY_AMOUNT, payload: Number(incrementAmount) || 0})
                    }
                >add by amount</button>

            </div>
        </div>
)
}

export default Counter;