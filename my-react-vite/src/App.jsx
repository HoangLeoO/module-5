import  { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Hello</h1>
        </div>,
        <div>

            <p>Giá trị: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Tăng
            </button>
        </div>
    );
};
