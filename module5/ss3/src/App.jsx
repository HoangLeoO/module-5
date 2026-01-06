import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListCustomerComponent from "./componnet/ListCustomerComponent.jsx";
import DeleteComponent from "./componnet/DeleteComponent.jsx";
import AddCustomerComponent from "./componnet/AddCustomerComponent.jsx";
import TodoApp from "./componnet/TodoApp.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            {/*<ListCustomerComponent/>*/}
            <TodoApp/>
        </>
    )
}

export default App
